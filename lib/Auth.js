import jwt from 'jsonwebtoken'

export function ensureAuthenticated(token){
    if(!token){
        return null
    }
    try {
        const decoded = jwt.verify(token , process.env.Jwt_secret)
        return decoded
    } 
    catch (err) {
       return null 
    }
}

export function isPatient(user) {

    const validUser = user;

    if (!validUser) {
        return false;
    }

    if (validUser.role !== "Patient") {
        return false;
    }

    return true;
}

export function isDoctor(user) {
   const validUser = user;

    if (!validUser) {
        return false;
    }

    if (validUser.role !== "Doctor") {
        return false;
    }

    return true;
}