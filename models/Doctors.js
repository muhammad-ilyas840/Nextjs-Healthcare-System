import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema(
    {
        User: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            required: true,
        },

        specialization: {
            type: String,
            required: true,
        },

        gender: {
            type: String,
            required: true,
        },

        experience: {
            type: Number,
            required: true,
        },

        hospital : {
        type : String,
        required : true
    } ,

        consultationFee : {
        type : Number,
        required : true
    } ,

        address: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.models.Doctors ||
    mongoose.model("Doctors", DoctorSchema);