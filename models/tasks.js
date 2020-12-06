const mongoose = require('mongoose');
const Schema = mongoose.Schema

const tasksSchema = new Schema(
    {
        taskStartPoint: { type: String, required: true, unique: false },
        taskEndPoint: { type: String, required: true, unique: false },
        timeCreated: { type: String, required: false  },
        timeTargetTime: { type: String, required: true },
        timeActual: { type: String, required: false },
        timeCompleted: { type: String, required: false },
       
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
        completed: { type: Boolean, default: false },
        remarks:{type: String, required: false}
        
    }

);


const Tasks = mongoose.model("Tasks", tasksSchema);

module.exports = Tasks;