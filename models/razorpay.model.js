import express from "express";
import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    orderId: String,
    paymentId: String,
    amount: Number,
    currency: String,
    status: String,
    //   createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);
const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
