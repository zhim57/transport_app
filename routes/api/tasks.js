const router = require("express").Router();
const tasksController = require("../../controllers/tasksController");
const mongoose = require('mongoose');
const db = require("../../models");

// Matches with "/api/tasks"
router.route("/")
  .get(tasksController.findAll)
  .post(tasksController.create);

// Matches with "/api/tasks/:id"
router
  .route("/:id")
  .get(tasksController.findById)
  .put(tasksController.update)
  .delete(tasksController.remove);

  // router
  // .route("/update/:id")
 
  // .put(tasksController.update)
 
  router.put("/update/:id", ( req,res) => {
    // console.log(req.body, "params ", req.params.id);
    // console.log("req.body.completed");
    // console.log(req.body.completed);
    // console.log("req.body.timeCompleted");
    // console.log(req.body.timeCompleted);

      db.Tasks.findOneAndUpdate({_id:mongoose.Types.ObjectId(req.params.id)},{ $set: {
        completed: req.body.completed,
        timeCompleted: req.body.timeCompleted
      
       
    }}).then(data => {    //,{new: true}
        // console.log("data");
        // console.log(data);
        res.json({data});
    })
    .catch(err => {
        console.log(err);
        res.status(401).json(err);
    });
});
  router.put("/updatea/:id", ( req,res) => {
    // console.log(req.body, "params ", req.params.id);
    // console.log("req.body.aborted");
    // console.log(req.body.aborted);
    // console.log("req.body.timeAborted");
    // console.log(req.body.timeAborted);

      db.Tasks.findOneAndUpdate({_id:mongoose.Types.ObjectId(req.params.id)},{ $set: {
        completed: req.body.aborted,
        timeCompleted: req.body.timeAborted
      
       
    }}).then(data => {    //,{new: true}
        // console.log("data");
        // console.log(data);
        res.json({data});
    })
    .catch(err => {
        console.log(err);
        res.status(401).json(err);
    });
});
module.exports = router;
