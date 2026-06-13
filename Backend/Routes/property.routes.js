
const express = require('express');
const router = express.Router();
const {wrapAsync, validateListing, isLoggedIn, isOwner} = require('../Utils/middleware');
const {properties, propertyDetails, addProperty, editProperty, deleteProperty} = require('../Controller/property.controller');
const {upload} = require('../Cloudnary/cloudConfig');


router
    .route("/")
    .get(wrapAsync(properties))
    .post(isLoggedIn, upload.single('image'), addProperty);
;


router
    .route("/:id")
    .get(wrapAsync(propertyDetails))
    .put(isLoggedIn, isOwner, upload.single('image'), wrapAsync(editProperty))
    .delete(isLoggedIn, isOwner, wrapAsync(deleteProperty));
;


module.exports = router;