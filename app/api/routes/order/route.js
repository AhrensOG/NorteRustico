import { Op } from "sequelize";

const { Order, User, Product } = require("@/db/models/models");

export async function GET(req) {
  try {
    const orders = await Order.findAll({
      include: [{ model: User }, { model: Product, paranoid: false }],
      order: [["createdAt", "DESC"]],
    });

    return Response.json(orders);
  } catch (error) {
    return Response.json(error.message, { status: 500 });
  }
}

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

    if (prevOrder) {
      await prevOrder.destroy();
    }

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

export async function PUT(req) {
  try {
    const {
      orderId,
      status,
      totalPrice,
      deliveryCost,
      cartPrice,
      discountedCartPrice,
      delivered,
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
      trackingId,
    } = await req.json();

    if (!orderId) {
      return Response.json("Order ID is missing", { status: 400 });
    }

    const order = await Order.findByPk(orderId);
    if (!order) {
      return Response.json("Order not found", { status: 404 });
    }

    if (status) {
      order.status = status;
    }
    if (totalPrice) {
      order.totalPrice = totalPrice;
    }
    if (deliveryCost) {
      order.deliveryCost = deliveryCost;
    }
    if (cartPrice) {
      order.cartPrice = cartPrice;
    }
    if (discountedCartPrice) {
      order.discountedCartPrice = discountedCartPrice;
    }
    if (delivered !== undefined) {
      order.delivered = delivered;
    }
    if (email) {
      order.email = email;
    }
    if (name) {
      order.name = name;
    }
    if (surname) {
      order.surname = surname;
    }
    if (street) {
      order.street = street;
    }
    if (streetNumber) {
      order.streetNumber = streetNumber;
    }
    if (flat) {
      order.flat = flat;
    }
    if (apartament) {
      order.apartament = apartament;
    }
    if (postalCode) {
      order.postalCode = postalCode;
    }
    if (country) {
      order.country = country;
    }
    if (province) {
      order.province = province;
    }
    if (city) {
      order.city = city;
    }
    if (dni) {
      order.dni = dni;
    }
    if (phone) {
      order.phone = phone;
    }
    if (trackingId) {
      order.trackingId = trackingId;
    }

    await order.save();

    return Response.json(order);
  } catch (error) {
    // Manejar errores y devolver una respuesta de error
    return Response.json(error.message, { status: 500 });
  }
}
