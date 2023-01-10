const mongoose = require("mongoose");
const articuloSchema = new mongoose.Schema({
  img: String,
  name: String,
  precio: String,
  cantidad: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

articuloSchema.set("toJSON", {
  transform: (document, returnedObjet) => {
    returnedObjet.id = returnedObjet._id.toString();
    delete returnedObjet._id;
    delete returnedObjet.__v;
  },
});

const Articulo = mongoose.model("Articulo", articuloSchema);

module.exports = Articulo;
