export const saveRedirectUrl = (req, res, next ) =>{
    
    if (req.originalUrl) {
        req.session.redirectTo = req.originalUrl;
        // console.log(req.originalUrl);
 }
 next();
}