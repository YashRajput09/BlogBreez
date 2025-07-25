export const isAdmin = (role) =>{
    return async (req, res, next) => {
        try {
            
            if(!role.includes(req.user.role)){
                return res.status(403).json({ message: "Only admin can create Blogs" });
            }
            next();
        } catch (error) {
                console.log(error);      
        }
    }
}