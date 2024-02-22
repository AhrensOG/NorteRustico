import { Op } from "sequelize";

const { Order, User, Product } = require("@/db/models/models");

export async function POST(req) {
  try {
    const {
      userId,
      status,
      totalPrice,
      deliveryCost,
      cartPrice,
      discountedCartPrice,
      email,
      name,
      surname,
      street,
      streetNumber,
      flat,
      apartament,
      postalCode,
      country,
      province,
      city,
      dni,
      phone,
    } = await req.json();

    // Verificar que todos los campos requeridos estén presentes
    if (
      !userId ||
      !status ||
      !totalPrice ||
      !deliveryCost ||
      !cartPrice ||
      !discountedCartPrice ||
      !email ||
      !name ||
      !surname ||
      !street ||
      !streetNumber ||
      !postalCode ||
      !country ||
      !province ||
      !city ||
      !dni ||
      !phone
    ) {
      return Response.json("Missing Data / All fields are required", {
        status: 400,
      });
    }

    const prevOrder = await Order.findOne({
      where: { [Op.and]: [{ UserId: userId }, { status: "Pending" }] },
    });

    await prevOrder.destroy();

    const user = await User.findByPk(userId);

    if (!user) {
      return Response.json("User not found", { status: 404 });
    }

    const newOrder = await Order.create({
      status,
      totalPrice,
      deliveryCost,
      cartPrice,
      discountedCartPrice,
      email,
      name,
      surname,
      street,
      streetNumber,
      flat,
      apartament,
      postalCode,
      country,
      province,
      city,
      dni,
      phone,
    });

    await user.addOrder(newOrder);

    const order = await Order.findOne({
      where: {
        id: newOrder.id,
      },
      include: [{ model: User }, { model: Product }],
    });

    return Response.json(order);
  } catch (error) {
    // Manejar errores y devolver una respuesta de error
    return Response.json(error.message, { status: 500 });
  }
}
