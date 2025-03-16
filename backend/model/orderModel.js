import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true },
    order_id: { type: Number, unique: true }, // Auto-increment order ID
    customerName: { type: String, required: true },
    dressPhoto: { type: String, default: "" },
    voiceNote: { type: String, default: "" },
    phone: { type: String },
    totalAmount: { type: Number, required: true },
    advanceAmount: { type: Number, default: 0 }, 
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Advance"],
      default: "Pending",
    },
    orderStatus: {
      type: String,
      enum: ["Pending", "Completed", "Cancelled"],
      default: "Pending",
    },
    withLining: { type: Boolean, default: false }, 
    modelDress: { type: Boolean, default: false }, 
    orderDate: { type: String, required: true },
    deliveryDate:{ type: String, required: true },
    reminderDate: { type: String, required: true }, 
  },
  { timestamps: true }
);

// **Auto-Increment order_id before saving**
orderSchema.pre("save", async function (next) {
  if (!this.order_id) {
    const lastOrder = await mongoose.model("Order").findOne().sort({ order_id: -1 });
    this.order_id = lastOrder ? lastOrder.order_id + 1 : 100; // Start from 100
  }
  next();
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
