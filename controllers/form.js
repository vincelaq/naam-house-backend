/* ==== Form Controller ==== */
const mongoose = require("mongoose");
const db = require("../models");

const Vonage = require('@vonage/server-sdk')
const vonage = new Vonage({
  apiKey: process.env.VONAGE_API,
  apiSecret: process.env.VONAGE_SECRET
})

// Create Post - POST - Creation of new post
const create = async (req, res) => {
  
  // Validate request
  if (!req.body.curLocation) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Entry
  const entry = {
    vetName: req.body.vetName,
    curLocation: req.body.curLocation,
    freqLocation: req.body.freqLocation,
    ping: req.body.ping,
    behavior: req.body.behavior,
    resName: req.body.resName,
    resContact: req.body.resContact
  };


  const newPost = new db.Form(entry);

  try {
      const session = await mongoose.startSession();
      session.startTransaction(); 
      await newPost.save({ session: session });
      await session.commitTransaction();

      const shared = JSON.parse(req.body.ping)
      const lat = shared.coords.latitude
      const lng = shared.coords.longitude
      const from = process.env.PHONEFROM
      const to = process.env.PHONETO
      const text = `Reported -- 
        Name: ${req.body.vetName}, 
        Cur Loc: ${req.body.curLocation}, 
        Freq Loc: ${req.body.freqLocation},
        Map: ${req.body.freqLocation},  
        Behav: ${req.body.behavior}, 
        Reporter: ${req.body.resName}, 
        Rep Contact: ${req.body.resName},
        comgooglemapsurl://maps.google.com/?q=@${lat},${lng} ---`
    
      vonage.message.sendSms(from, to, text, (err, responseData) => {
          if (err) {
              console.log(err);
          } else {
              if(responseData.messages[0]['status'] === "0") {
                  console.log("Message sent successfully.");
              } else {
                  console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
              }
          }
      })
      
      return res.json({
          message: "Success: Added New Post",
          data: newPost
      });
  } catch (err) {
      return res.status(500).json({
          message: "Error: Posting failed, please try again later",
          data: err
      });
  };


};

module.exports = { create }