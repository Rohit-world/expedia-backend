const express = require("express");
const HotelRoute = express.Router();
const { HotelModel } = require("../models/hotel.model");

HotelRoute.get("/", async (req, res) => {
  const {sort}=req.query
  console.log(sort)
  try {
    const Hotels = await HotelModel.find().sort({hotelFees:sort})
    res.status(200).send(Hotels);
  } catch (err) {
    res.status(404).send({ msg: "NOT FOUND" });
  }
});

HotelRoute.get("/:hotelID", async (req, res) => {
  const hotelID = req.params.hotelID;
  try {
    const hotel = await HotelModel.findById(hotelID);
    res.status(200).send(hotel);
  } catch (err) {
    console.log(err);
    res.status(404).send({ msg: "not a valid ID" });
  }
});


HotelRoute.post("/",async(req,res)=>{
  console.log(req.body)
const payload=req.body
try{
const newHotel =new HotelModel(payload)
await newHotel.save()
res.status(200).send({"msg":"Hotel added successfully"})
}catch(err){
  console.log(err)
  res.send(401).send({"msg":"something went wrong"})
}
})

HotelRoute.delete("/:hotelID", async (req, res) => {
  const hotelID = req.params.hotelID;
  console.log(hotelID)
  try {
    await HotelModel.findByIdAndRemove(hotelID);
    res.status(200).send({"msg":"Hotel Deleted successfully"});
  } catch (err) {
    console.log(err);
    res.status(404).send({ msg: "error" });
  }
});

module.exports = { HotelRoute };
