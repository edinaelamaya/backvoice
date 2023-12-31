const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
console.log("comenzo")

app.use('/api', require('./routes/index'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});