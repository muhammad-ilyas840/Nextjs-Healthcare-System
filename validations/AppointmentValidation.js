import Joi from "joi";

const AppointmentValidation = (data) => {
    const schema = Joi.object({
        Patient: Joi.string()
            .hex()
            .length(24)
            .required(),

        Doctor: Joi.string()
            .hex()
            .length(24)
            .required(),

        reason: Joi.string()
            .required(),

        appointmentDate: Joi.date()
            .required(),
        
        status : Joi.string()
        .valid(
            "Pending",
            "Confirmed",
            "Completed",
            "Cancelled"
        )
        .optional()
    });

    return schema.validate(data);
};

export default AppointmentValidation;