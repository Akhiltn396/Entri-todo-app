const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser")
const cors = require("cors")


const Dbconnect = require("./config/dbConnect")

const taskRouter = require("./routes/task")
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });
app.use(express.json())
app.use(cors({origin:"http://localhost:3005",credentials:true}))
app.use(bodyParser.urlencoded({ extended: true }));

app.use(taskRouter);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});