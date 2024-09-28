const User=require("../models/user.js");

module.exports.signupForm=(req,res)=>{
    res.render("users/signup.ejs");
    };
module.exports.signup=async(req,res)=>{
    try{
    let   {username,email,password}=req.body;
    const newUser=new User({email,username});
    let registeruser= await User.register(newUser,password);
    console.log(registeruser);
    req.login(registeruser,(err)=>{
        if(err){
            return next(err)
        }
        req.flash("success","Welcome to Wanderlust");
        res.redirect("/listings");
    });


  
} catch(e){
    req.flash("error",e.message);
    res.redirect("/signup")
    

}

};

module.exports.loginForm=(req,res)=>{
    res.render( "users/login.ejs");
};
module.exports.login=async(req,res)=>{
    req.flash("success","Welcome To Wanderlust");
    let redirecturl=res.locals.redirectUrl || "/listings";
    res.redirect(redirecturl);

};
module.exports.logout=(req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","You Logout Successfully");
        res.redirect("/listings");
    });
};