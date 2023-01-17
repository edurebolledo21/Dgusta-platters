const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  img: String,
  name: String,
  precio: String,
  cantidad: Number,
});

const carritoSchema = new mongoose.Schema({
  items: [itemSchema],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

carritoSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Carrito = mongoose.model("Carrito", carritoSchema);

module.exports = Carrito;
