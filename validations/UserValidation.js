import Joi from "joi";

const UserValidation = (data) => {
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

        role: Joi.string()
            .valid("Patient", "Doctor")
            .required(),
    });

    return schema.validate(data);
};

export default UserValidation;