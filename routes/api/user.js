const router = require("express").Router();
const mongoose = require('mongoose');
// Requiring our models and passport as we've configured it
const db = require("../../models");
const passport = require("../../config/passport");
// const userController = require("../../controllers/userController_old");

// -> /api/user/test
router.get("/test", (req, res) => {
    res.json(true);
});

// router
//   .route("/profileUpdate :id")
//    .put(userController.update)
//    .delete(userController.remove);


// Using the passport.authenticate middleware with our local strategy.
// If the user has valid login credentials, send them to the members page.
// Otherwise the user will be sent an error
// -> /api/user/login
router.post("/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
        email: req.user.email,
        _id: req.user._id,
        role: req.user.role
    });
});

// Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
// how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
// otherwise send back an error
router.post("/signup", (req, res) => {
    console.log(req.body);
    db.User.create({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        role: req.body.role
    })
    .then(data => {
        res.json({
            email: data.email,
            role: data.role
        });
    })
    .catch(err => {
        console.log(err);
        res.status(401).json(err);
    });
});

router.put("/update/:id", ( req,res) => {
    console.log(req.body, "params ", req.params.id);
      db.User.findOneAndUpdate({_id:mongoose.Types.ObjectId(req.params.id)},{ $set: {
        nameFirst: req.body.nameFirst,
        role: req.body.role,
        nameLast: req.body.nameLast,
        vesselName: req.body.vesselName,
        position: req.body.position,
        profilePicture: req.body.profilePicture,
        vesselEmail: req.body.vesselEmail,
        phoneNumber: req.body.phoneNumber     
    }},{
        new: true
      }).then(data => {
        console.log("data");
        console.log(data);
        res.json({data});
    })
    .catch(err => {
        console.log(err);
        res.status(401).json(err);
    });
});

// Route for logging user out
router.get("/logout", (req, res) => {
    req.logout();
    res.json(true);
});

// Route for getting some data about our user to be used client side
router.get("/data", (req, res) => {
    if (!req.user) {
        // The user is not logged in, send back an empty object
        res.json({});
    } else {
        // Otherwise send back the user's email and id
        // Sending back a password, even a hashed password, isn't a good idea
        res.json({
            email: req.user.email,
            _id: req.user._id,
//cludinary stuff pigiback
            username: req.user.name,
            role: req.user.role,
            profilePicture: req.user.profilePicture,
            cloudUploadName: process.env.CLAUDINARY_CLOUDNAME,
            cloudUploadPreset: process.env.CLAUDINARY_PRESET
        });
    }
});
module.exports = router;
