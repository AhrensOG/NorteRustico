import { Categories, Favourites, Order, Product, ProductImages, Qualifications, Tags, User } from "@/db/models/models";
import { Op } from "sequelize";

export async function GET(req) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const nameQuery = searchParams.get("name");

    if (!nameQuery) {
      return Response.json("Name query parameter is required", {
        status: 400,
      });
    }

    const data = await Product.findAll({
      where: {
        name: {
          [Op.iLike]: `%${nameQuery}%`, // Case-insensitive search for name
        },
      },
      include: [
        { model: ProductImages },
        { model: Order },
        { model: User, through: Favourites },
        { model: User, through: Qualifications },
        { model: Categories },
        { model: Tags },
      ],
      order: [["createdAt", "DESC"]]
    });
    
    return Response.json(data);
  } catch (error) {
    return Response.json(error.message, { status: 500 });
  }
}