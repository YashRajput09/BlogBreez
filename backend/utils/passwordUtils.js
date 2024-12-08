import bcrypt from "bcrypt";

export const hashPassword = async(password) =>{
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.log(error);   
    }
}

export const comparePassword = async(inputPassword, storedHashedPassword) =>{
    try {
        return await bcrypt.compare(inputPassword, storedHashedPassword);
    } catch (error) {
        console.log(error);
    }
}