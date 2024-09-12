import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema(
  {
    userId: String,
    address: String,
    city: String,
    pincode: String,
    phone: String,
    notes: String,
  },
  { timestamps: true }
);

const Address = mongoose.model("Adreess",AddressSchema)
export default Address;