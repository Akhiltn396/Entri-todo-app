const express = require("express");

const {addTask,getTask, editTask, deleteTask} = require("../controllers/task")
const router = express.Router();

router.post("/add",addTask)
router.get("/getTask",getTask)
router.put("/editTask/:id",editTask)
router.delete("/deleteTask/:id",deleteTask)

module.exports = router;