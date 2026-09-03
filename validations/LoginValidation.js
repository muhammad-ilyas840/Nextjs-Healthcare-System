import Joi from 'joi'

const LoginValidation = (data)=>{
    const schema =  Joi.object({
        email: Joi.string()
        .email()
        .required(),
        
        password: Joi.string()
        .required()
})
return schema.validate(data)
}

export default LoginValidation