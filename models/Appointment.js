import mongoose from "mongoose";
import Patients from "./Patients";

const AppointmentSchema = new mongoose.Schema({
    Patient : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Patients',
        required : true
    } ,
    Doctor : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Doctors',
        required : true
    } ,
    reason : {
        type : String,
        required : true
    } ,
    appointmentDate : {
        type : Date,
        required : true
    },

    status : {
        type : String,
        enum : ["Pending" , "Confirmed" , "Cancelled" , "Completed"],
        default : "Pending"
    }
} , { timestamps: true })

export default mongoose.models.Appointments || mongoose.model('Appointments', AppointmentSchema)