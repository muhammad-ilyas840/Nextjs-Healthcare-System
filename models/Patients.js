import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema(
    {
        User: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            required: true,
        },

        age: {
            type: Number,
            required: true,
        },

        gender: {
            type: String,
            required: true,
        },

        bloodgroup: {
            type: String,
            required: true,
        },

        address: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.models.Patients ||
    mongoose.model("Patients", PatientSchema);