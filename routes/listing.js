const express =require("express");
const router=express.Router();
const wrapAsync=require("../utils/Async.js");
const{listingSchema}=require("../schema.js");
const ExpressError=require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const {isLoggedIn,isowner,validateListing}=require("../middleware.js");
const Review=require("../models/review.js");
const listingController=require("../controllers/listing.js");
const multer =require("multer");
const {storage}=require("../routes/cloudConfig.js");

const upload =multer({storage});

//index & create route
router.route("/").get(wrapAsync(listingController.index))
.post( upload.single('listing[image]'),wrapAsync(listingController.renderCreateForm));



router.get("/new",isLoggedIn,listingController.renderNewForm);

//show route & update & delete
router.route("/:id").get(wrapAsync( listingController.showListing)).
put(isLoggedIn,isowner,upload.single('listing[image]'), wrapAsync(listingController.renderUpdateForm)).
delete(isowner,upload.single('listing[image]') ,wrapAsync(listingController.renderDeleteForm));


  //New Route
  

  //Edit Route
  router.get("/:id/edit",isLoggedIn,isowner, wrapAsync(listingController.renderEditform));
  
  
  module.exports=router;