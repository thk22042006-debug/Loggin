const { verifyToken } = require("./auth.middelware")



// ONLY USER
const verifyUser = ( req, res , next )=>{
    verifyToken(req, res, ()=>{
        if(req.user.role === Role.User){
            return next()
        }
    })
    return res.status(403).json({ message: "Only user allowed" })
}



// ONLY SUPERADMIN
const verifySuperAdmin = ( req, res, next )=>{
    verifyToken ( req, res, ()=>{
        if(req.user.role === Role.SuperAdmin){
            return next()
        }
        return res.status(403).json({ message: "Only superAdmin allowed" })
    })
}


// USER CAN VIEW THEMSELF
// SUPERADMIN CAN VIEW ANY USER
const verifySelfOrSuperAdmin = (req, res, next )=>{
    verifyToken(req, res, ()=>{
        if(req.user.role === Role.SuperAdmin || req.user.id === req.params.id){
            return next()
        }
        return res.status(403).json({ message: "no permission" })
    })


}
module.exports = {
    verifyUser, 
    verifySuperAdmin,
    verifySelfOrSuperAdmin
}