import Razorpay from "razorpay";
import Payment from "../models/razorpay.model.js";
import dotenv from "dotenv";

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createOrder = async (req, res) => {
  try {
    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// verifyPayment 

export const verifyPayment = async (req, res) => {
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const signature = req.headers["x-razorpay-signature"];
    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(JSON.stringify(req.body));
    const digest = hmac.digest("hex");

    if (digest !== signature) {
      return res.status(400).json({ message: "Invalid signature" });
    }

    const payment = new Payment({
      orderId: req.body.payload.payment.entity.order_id,
      paymentId: req.body.payload.payment.entity.id,
      amount: req.body.payload.payment.entity.amount / 100, 
      currency: req.body.payload.payment.entity.currency,
      status: req.body.payload.payment.entity.status,
    });

    await payment.save();
    res.json({ status: "ok" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
