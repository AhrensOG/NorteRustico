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

export async function POST(req) {
  try {
    const body = await req.json();
    if (!Array.isArray(body) || body.length === 0) {
      return Response.json("Categories array is necesary", { status: 400 });
    }

    const categoryNames = body.map((obj) => obj.name);

    const products = await Product.findAll({
      include: [
        {
          model: Categories,
          attributes: ["name"],
          where: { name: categoryNames },
        },
        { model: ProductImages },
        { model: Order },
        { model: User, through: Favourites },
        { model: User, through: Qualifications },
        { model: Tags },
      ],
    });

    if (products.length === 0) {
      return Response.json("Products not found", { status: 404 });
    }

    const copiedProducts = JSON.parse(JSON.stringify(products));

    const productsWithCount = copiedProducts.map((product) => ({
      ...product,
      count: product.Categories.length,
    }));

    productsWithCount.sort((a, b) => b.count - a.count);

    return Response.json(productsWithCount);
  } catch (error) {
    return Response.json(error.message, { status: 500 });
  }
}

