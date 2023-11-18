const mysqlConnection = require('../config/mysqlConfig');
const config = require('../config');
const fs = require('fs');
const path = require('path');
const docxtemplater = require('docxtemplater');
const pdf = require('pdf-parse');
const Docs = require('../models/document')

exports.uploadDocument = async (req, res) => {
  try {
    const { filename } = req.file;
    const extension = path.extname(filename);
    const id_users = 1;
    console.log("filename",extension)
    const sql = 'INSERT INTO documentos (id_users,contenido,tipo) VALUES (?, ?, ?)';
    mysqlConnection.query(sql, [id_users,filename, extension], (err, result) => {
      if (err) {
          console.error('Error document users in MySQL:', err);
          res.status(500).json({ error: 'Error Document uploaded' });
      } else {
          console.log('document exitosamente en MySQL');
          const insertedUserId = result.insertId
          res.status(201).json({ message: 'Document uploaded successfully', userId: insertedUserId });
      }
      });

      

  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

function obtainDocumentContent(filename, extension) {
  const filePath = path.join(config.uploadsDir, filename);

  if (extension === '.docx') {
    return extractDocxContent(filePath);
  } else if (extension === '.pdf') {
    return extractPdfContent(filePath);
  } else if (extension === '.txt') {
    return extractTxtContent(filePath);
  } else {
    throw new Error('Unsupported file format');
  }
}

function extractDocxContent(filePath) {
  const content = fs.readFileSync(filePath, 'binary');
  const doc = new docxtemplater();
  doc.load(content);
  return doc.getFullText();
}

async function extractPdfContent(filePath) {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdf(dataBuffer);
  return data.text;
}

function extractTxtContent(filePath) {
  return fs.readFileSync(filePath, 'utf-8');
}

