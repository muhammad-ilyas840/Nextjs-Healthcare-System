import Joi from "joi";

const PatientValidation = (data) => {

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

        age: Joi.number()
            .required(),

        gender: Joi.string()
            .required(),

        bloodgroup: Joi.string()
            .required(),

        address: Joi.string()
            .required()
    });

    return schema.validate(data);
};

export default PatientValidation;