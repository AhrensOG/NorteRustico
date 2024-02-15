import { Favourites, Order, Product, Qualifications, User } from "@/db/models/models";
import { Op } from "sequelize";

export async function GET(req) {
  try {
    const { name } = req.nextUrl.searchParams;

    let whereClause = {};
    if (name) {
      whereClause = {
        [Op.or]: [
          { name: { [Op.substring]: name } },
          { surname: { [Op.substring]: name } },
          { email: { [Op.substring]: name } },
        ],
      };
    }

    const users = await User.findAll({
      where: whereClause,
      order: [["createdAt", "DESC"]],
    });

    return users.length
      ? Response.json(users)
      : Response.json("Users Not Found");
  } catch (error) {
    return Response.json(error.message, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const {
      id,
      name,
      surname,
      email,
      profileImage,
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

    if (!id) {
      return Response.json("User ID is required", { status: 400 });
    }

    const existingUser = await User.findByPk(id);
    if (!existingUser) {
      return Response.json(`User with ID ${id} does not exist`, {
        status: 404,
      });
    }

    if (name) existingUser.name = name;
    if (surname) existingUser.surname = surname;
    if (email) existingUser.email = email;
    if (profileImage) existingUser.profileImage = profileImage;
    if (street) existingUser.street = street;
    if (streetNumber) existingUser.streetNumber = streetNumber;
    if (flat) existingUser.flat = flat;
    if (apartament) existingUser.apartament = apartament;
    if (postalCode) existingUser.postalCode = postalCode;
    if (country) existingUser.country = country;
    if (province) existingUser.province = province;
    if (city) existingUser.city = city;
    if (dni) existingUser.dni = dni;
    if (phone) existingUser.phone = phone;

    await existingUser.save();

    const updatedUser = await User.findOne({ where: { id }, include: [ {model: Order}, {model: Product, through: Favourites}, {model: Product, through: Qualifications} ] })

    return Response.json(updatedUser);
  } catch (error) {
    return Response.json(error.message, { status: 500 });
  }
}
