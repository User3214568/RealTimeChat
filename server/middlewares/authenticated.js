function authenticated(req,res,next){
    if(req.user){
        next()
    }
    else{
        res.redirect('/signup')
    }

}