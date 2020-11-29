const mongoose = require('mongoose');
const Schema = mongoose.Schema

const tasksSchema = new Schema(
    {
        taskStartPoint: { type: String, required: true, unique: false },
        taskEndPoint: { type: String, required: true, unique: false },
        timeCreated: { type: Date, default: Date.now },
        timeTargetTime: { type: String, required: true },
        timeActual: { type: Date, default: Date.now },
        timeCompleted: { type: Date, default: Date.now },
       
        driverName: { type: String, required: false },
        vehiclePlate: { type: String, required: false },
        clientNameFirst: { type: String, required: true },
        clientNameLast: { type: String, required: true },
        clientEmail: { type: String, required: true },
        peopleCount: Number,
        taskNumber: Number,
        vesselName: { type: String, required: true },
        vesselEmail: { type: String, required: false },
        
        terminalName: { type: String, required: false },
        description: { type: String, required: true },
        clientImage: String,
        driverImage: String,
        vehicleImage: String,
        started: { type: Boolean, default: false },
        aborted: { type: Boolean, default: false },
        reasonAborted: String,
        completed: { type: Boolean, default: false }
        
    }

);


const Tasks = mongoose.model("Tasks", tasksSchema);

module.exports = Tasks;