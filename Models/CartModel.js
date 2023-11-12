import * as mongoose from 'mongoose'
const CartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.ObjectId, ref: 'User' },
    productId: { type: mongoose.Schema.ObjectId, ref: 'Product' },
    quantity: { type: Number, default: 1, required: true, }
})