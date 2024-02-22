import {
  Categories,
  Favourites,
  Order,
  Product,
  ProductImages,
  Qualifications,
  Tags,
  User,
} from "@/db/models/models";

export async function POST() {
  try {
    const data = await Product.findAll({
      include: [
        { model: ProductImages },
        { model: Order },
        { model: User, through: Favourites },
        { model: User, through: Qualifications },
        { model: Categories },
        { model: Tags },
      ],
      order: [["score", "DESC"]],
    });
    return Response.json(data);
  } catch (error) {
    return Response.json(error.message, { status: 500 });
  }
}
