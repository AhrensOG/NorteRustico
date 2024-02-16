import {
  Favourites,
  User,
  Product,
  Order,
  ProductImages,
  Qualifications,
  Categories,
  Tags,
} from "@/db/models/models";

export async function GET(req) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const userId = searchParams.get("user_id");

    if (!userId) {
      return Response.json("User ID is required in query parameters", {
        status: 400,
      });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return Response.json(`User with ID ${userId} does not exist`, {
        status: 404,
      });
    }

    const favourites = await Favourites.findAll({
      where: {
        UserId: userId,
      },
    });

    if (favourites.length === 0) {
      return Response.json(false);
    }

    const productIds = favourites.map((favourite) => favourite.ProductId);
    const products = await Product.findAll({
      where: {
        id: productIds,
      },
      include: [
        { model: ProductImages },
        { model: Order },
        { model: User, through: Favourites },
        { model: User, through: Qualifications },
        { model: Categories },
        { model: Tags },
      ],
      order: [["createdAt", "DESC"]],
    });

    return Response.json(products);
  } catch (error) {
    return Response.json(error.message, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const productId = searchParams.get("product_id");
    const userId = searchParams.get("user_id");

    if (!productId || !userId) {
      return Response.json("Both product ID and user ID are required", {
        status: 400,
      });
    }

    const product = await Product.findByPk(productId);
    const user = await User.findByPk(userId);

    if (!product) {
      return Response.json(`Product with ID ${productId} does not exist`, {
        status: 404,
      });
    }

    if (!user) {
      return Response.json(`User with ID ${userId} does not exist`, {
        status: 404,
      });
    }

    const existingFavourite = await Favourites.findOne({
      where: {
        UserId: userId,
        ProductId: productId,
      },
    });

    if (existingFavourite) {
      return Response.json("Product is already a favourite for this user", {
        status: 400,
      });
    }

    await Favourites.create({
      UserId: userId,
      ProductId: productId,
    });

    const updatedUser = await User.findOne({
      where: { id: userId },
      include: [
        { model: Product, through: { model: Favourites } },
        { model: Order },
      ],
    });

    return Response.json(updatedUser);
  } catch (error) {
    console.log(error);
    return Response.json(error.message, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const productId = searchParams.get("product_id");
    const userId = searchParams.get("user_id");

    if (!productId || !userId) {
      return Response.json(
        "Both product ID and user ID are required in query parameters",
        {
          status: 400,
        }
      );
    }

    const product = await Product.findByPk(productId);
    const user = await User.findByPk(userId);

    if (!product) {
      return Response.json(`Product with ID ${productId} does not exist`, {
        status: 404,
      });
    }

    if (!user) {
      return Response.json(`User with ID ${userId} does not exist`, {
        status: 404,
      });
    }

    const existingFavourite = await Favourites.findOne({
      where: {
        UserId: userId,
        ProductId: productId,
      },
    });

    if (!existingFavourite) {
      return Response.json("Product is not a favourite for this user", {
        status: 400,
      });
    }

    await existingFavourite.destroy();

    const updatedUser = await User.findOne({
      where: { id: userId },
      include: [
        { model: Product, through: { model: Favourites } },
        { model: Product, through: { model: Qualifications } },
        { model: Order },
      ],
    });

    return Response.json(updatedUser);
  } catch (error) {
    return Response.json(error.message, { status: 500 });
  }
}
