const express =require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/Async.js");
const reviewController=require("../controllers/review.js");

const Review=require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview,isLoggedIn }=require("../middleware.js");




//Reviews
router.post("/",isLoggedIn , validateReview,wrapAsync( reviewController.createReview));
  //delete review
  router.delete("/:reviewId",isLoggedIn,validateReview,wrapAsync( reviewController.destroyReview));
  
  module.exports=router;