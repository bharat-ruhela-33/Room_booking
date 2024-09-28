if(process.env.NODE_ENV !="production"){
  require('dotenv').config();
}


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate=require("ejs-mate");
const ExpressError=require("./utils/ExpressError.js");

const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport=require("passport");
const localStrategy=require("passport-local");
const wrapAsync=require("./utils/Async.js");
const User=require("./models/user.js");
const listingsrouter=require("./routes/listing.js");
const reviewsrouter=require("./routes/review.js");
const userrouter=require("./routes/userrouter.js");

// const ExpressError=require("./utils/ExpressError.js");

const Listing = require("./models/listing.js");






// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const dbUrl=process.env.ATLAS_MONGO

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(dbUrl);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

const store=MongoStore.create({
  mongoUrl:dbUrl,
  crypto:{
    secret:process.env.SECRET,

  },
  touchAfter:24*60,
});
const sessionOptions={
 store,
  secret:process.env.SECRET,
  resave:false,
  saveUnintialized:true
};
app.get("/", (req, res) => {
  res.send("Hi, I am root");
});

store.on("error",()=>{
  console.log("Error in session store",err)
})
app.use(session(sessionOptions));
app.use(flash());
//passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));



passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
  res.locals.success=req.flash("success");
  res.locals.error=req.flash("error");
  res.locals.currUser=req.user;
  next();
}); 


// app.get("/demouser", async(req,res)=>{
//   let fakeuser=new User({
//     email:"bharatruhela33@gmail.com",
//     username:"Bharat",
//   }); 
//    let registereduser=await User.register(fakeuser,"helloWorld");
//    res.send(registereduser);

// });




app.use("/listings",listingsrouter);
app.use("/listings/:id/reviews",reviewsrouter);
app.use("/",userrouter);


app.all("*",(req,res,next) =>{
  next(new ExpressError(404,"Page does not find"));
});


app.use((err,req,res,next)=>{
  let{statusCode=500,message="Something went wrong"} =err;
res.render("error.ejs",{message});
});
app.listen(8080, () => {
  console.log("server is listening to port 8080");
});
