const mongoose = require("mongoose");
const db = require("../models");
require("dotenv").config();


// This file empties the Products collection and inserts the products below

mongoose.connect(
    process.env.MONGODB_URI ||
    "mongodb://localhost/transportappDB"
);

const TasksSeed = [
    {
        // _id
        taskStartPoint: "PNCT",
        taskEndPoint: "jersey Gardens gate 5",
        timeCreated: new Date(Date.now()),
        timeTargetTime: new Date(Date.now()),
        timeActual: new Date(Date.now()),
        timeCompleted: new Date(Date.now()),
        clientNameLast:"Smith",
        clientNameFirst: "John",
        clientEmail:"jSmith@example.com",
        peopleCount: 3,
        vesselName:"m/v Good Hope",
        terminalName: "PNCT",

        description:"Transport",
        taskNumber:1,
        clientImage:"./clientImage.jpg",
        driverImage: "./driverImage.jpg",
        vehicleImage:"./vanImage.jpg",
        driverName: "Flash Gordon Jr.",
        vehiclePlate: "NJS-47V"

    },
    {
        taskStartPoint: "APM",
        taskEndPoint: "jersey Gardens gate 5",
        timeCreated: new Date(Date.now()),
        timeTargetTime: new Date(Date.now()),
        timeActual: new Date(Date.now()),
        timeCompleted: new Date(Date.now()),
        clientNameLast:"Smithson",
        clientNameFirst: "Johnson",
        clientEmail:"jSmithson@example.com",
        peopleCount: 2,
        vesselName:"m/v Antares",
        terminalName: "APM",

        description:"Transport",
        taskNumber:1,
        clientImage:"./clientImage.jpg",
        driverImage: "./driverImage.jpg",
        vehicleImage:"./vanImage.jpg",
        driverName: "Flash Gordon Sr.",
        vehiclePlate: "SCI-21Z"
    }
    
];

db.Tasks
    .remove({})
    .then(() => db.Tasks.collection.insertMany(TasksSeed))
    .then(data => {
        console.log(data.result.n + " records inserted!");
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
