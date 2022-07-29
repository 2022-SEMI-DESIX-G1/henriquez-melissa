import mongoose from "mongoose";
const Schema = mongoose.Schema;


const formSchema = new Schema({
    name: String,
    email: String,
    address: String,
    phone: String,
    priceYappy: String,
    detail: String
});

// Crear modelo 
const orders = mongoose.model('orders', formSchema);

export default orders;

