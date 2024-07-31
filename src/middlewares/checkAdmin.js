import { createResponse } from "../utils.js";

export const checkAdmin = async (req, res)=>{
    try {
        const {role} = req.user;
        if(role !== "admin") createResponse(res, 401, "Este Apartado es solo para usuarios administradores")
            else next();
    } catch (error) {
        next(error)
    }
}