import Joi from "joi";

const DoctorValidation = (data) => {
    const schema = Joi.object({
        fullname: Joi.string()
        .required(),
        
        email: Joi.string()
        .email()
        .required(),
       
        password: Joi.string()
        .min(3)
        .max(30)
        .required(),
        
        specialization: Joi.string()
            .required(),

        gender: Joi.string()
            .valid("Male", "Female")
            .required(),

        experience: Joi.number()
            .min(0)
            .required(),

        hospital: Joi.string()
            .required(),

        consultationFee: Joi.number()
            .min(0)
            .required(),

        address: Joi.string()
            .required(),
    });

    return schema.validate(data);
};

export default DoctorValidation;