import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  image: { type: String },
  category: { type: String },
  oldPrice: { type: Number },
  stock: { type: Number, default: 0 },
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);
export default Product;
