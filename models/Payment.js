const mongoose = require('mongoose')

const PaymentSchema = new mongoose.Schema({
    Patient : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Patients',
        required : true 
    },
    Doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctors",
        required: true
    },
    Appointment : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Appointments',
        required : true
    } ,
    amount : Number,
    paymentMethod : String,
    transactionId : String,
    paymentStatus : {
        type : String,
        enum : [
            "Pending",
            "Paid",
            "Failed"
        ] ,
        default : "Pending"
    }
},{timestamps:true})

export default mongoose.models.Payments ||
    mongoose.model("Payments", PaymentSchema);