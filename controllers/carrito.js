const carritoRouter = require("express").Router();
const User = require("../models/user");
const Carrito = require("../models/carrito");

carritoRouter.post("/", async (request, response) => {
  const { user } = request;

  if (!user) {
    return response.sendStatus(401);
  }

  // Eduardo

  const { img, name, precio, cantidad } = request.body;

  const carrito = await Carrito.findOne({ user: user._id });

  if (!carrito) {
    const newCarrito = new Carrito({
      items: [],
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    });

    await newUser.save();
    return response.sendStatus(201);
  }

  const exist = carrito.items.find((articulo) => articulo.name === item.name);

  if (exist) {
    const itemPorActualizar = carrito.items.id(exist.id);
    itemPorActualizar.cantidad = itemPorActualizar.cantidad + 1;
    await carrito.save();
    response.status(200).json(carrito.items.id(exist.id));
  }

  carrito.items.push({ img, name, precio, cantidad });
  await carrito.save();

  response.status(200).json(carrito.items[carrito.items.length - 1]);
});

carritoRouter.get("/", async (request, response) => {
  const { user } = request;

  if (!user) {
    return response.sendStatus(401);
  }

  const carrito = await Carrito.findOne({ user: user._id });

  response.status(200).json(carrito);
});

carritoRouter.delete("/:id", async (request, response) => {
  const { user } = request;

  if (!user) {
    return response.sendStatus(401);
  }
  const carrito = await Carrito.findOne({ user: user._id });

  carrito.items.id(request.query.id).remove();

  await carrito.save();
});

carritoRouter.patch("/:id", async (request, response) => {
  const { user } = request;

  if (!user) {
    return response.sendStatus(401);
  }
  const carrito = await Carrito.findOne({ user: user._id });

  carrito.items = [];

  await carrito.save();

  response.status(200).json(carrito.items.id(request.query.id));
});

module.exports = carritoRouter;
