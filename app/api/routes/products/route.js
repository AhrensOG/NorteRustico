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

export async function GET(req) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get("id");
    if (query) {
      const data = await Product.findOne({
        where: { id: query },
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
      return data ? Response.json(data) : Response.json("Product not found");
    }

    const data = await Product.findAll({
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
    return Response.json(data);
  } catch (error) {
    return Response.json(error.message, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const {
      name,
      description,
      price,
      discount,
      fewUnits,
      limitedOffer,
      quantity,
      heigth,
      width,
      large,
      weight,
    } = await req.json();

    if (
      !name ||
      !description ||
      !price ||
      !(discount >= 0) ||
      !fewUnits ||
      !limitedOffer ||
      !quantity ||
      !heigth ||
      !width ||
      !large ||
      !weight
    ) {
      return Response.json("Missing Data / All fields are required", {
        status: 400,
      });
    }

    const newProduct = await Product.create({
      name,
      description,
      price,
      discount,
      fewUnits: fewUnits === "yes",
      limitedOffer: limitedOffer === "yes",
      quantity,
      heigth,
      width,
      large,
      weight,
    });

    const createdProduct = await Product.findOne({
      where: { id: newProduct.dataValues.id },
      include: [
        { model: ProductImages },
        { model: Order },
        { model: User, through: Favourites },
        { model: User, through: Qualifications },
        { model: Categories },
        { model: Tags },
      ],
    });

    return Response.json(createdProduct);
  } catch (error) {
    return Response.json(error.message, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const {
      productId,
      name,
      description,
      price,
      discount,
      fewUnits,
      limitedOffer,
      quantity,
      heigth,
      width,
      large,
      weight,
    } = await req.json();

    if (!productId) {
      return Response.json("Product ID is required", {
        status: 400,
      });
    }

    const productToUpdate = await Product.findByPk(productId);

    if (!productToUpdate) {
      return Response.json(`Product with ID ${productId} does not exist`, {
        status: 404,
      });
    }

    if (name) {
      productToUpdate.name = name;
    }
    if (description) {
      productToUpdate.description = description;
    }
    if (price) {
      productToUpdate.price = price;
    }
    if (discount !== undefined) {
      productToUpdate.discount = discount;
    }
    if (fewUnits !== undefined) {
      productToUpdate.fewUnits = fewUnits === "yes";
    }
    if (limitedOffer !== undefined) {
      productToUpdate.limitedOffer = limitedOffer === "yes";
    }
    if (quantity !== undefined) {
      productToUpdate.quantity = quantity;
    }
    if (heigth !== undefined) {
      productToUpdate.heigth = heigth;
    }
    if (width !== undefined) {
      productToUpdate.width = width;
    }
    if (large !== undefined) {
      productToUpdate.large = large;
    }
    if (weight !== undefined) {
      productToUpdate.weight = weight;
    }

    await productToUpdate.save();

    const updatedProduct = await Product.findOne({
      where: { id: productToUpdate.id },
      include: [
        { model: ProductImages },
        { model: Order },
        { model: User, through: Favourites },
        { model: User, through: Qualifications },
        { model: Categories },
        { model: Tags },
      ],
    });

    return Response.json(updatedProduct);
  } catch (error) {
    return Response.json(error.message, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const productId = searchParams.get("id");

    if (!productId) {
      return Response.json("Product ID is required", {
        status: 400,
      });
    }

    const productToDelete = await Product.findByPk(productId);

    if (!productToDelete) {
      return Response.json(`Product with ID ${productId} does not exist`, {
        status: 404,
      });
    }

    await productToDelete.destroy();

    return Response.json("Product deleted successfully");
  } catch (error) {
    return Response.json(error.message, { status: 500 });
  }
}
