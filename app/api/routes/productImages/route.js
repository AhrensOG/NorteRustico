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
    const { productId, images } = await req.json();

    if (!productId || !images || images.length === 0) {
      return Response.json("Product ID and a non-empty array of images are required", { status: 400 });
    }

    const product = await Product.findByPk(productId);
    if (!product) {
      return Response.json(`Product with ID ${productId} does not exist`, { status: 404 });
    }

    const newImages = [];
    for (const image of images) {
      const newImage = await ProductImages.create({ name: image.name , url: image.url });
      newImages.push(newImage);
    }
    await product.addProductImages(newImages);

    const updatedProduct = await Product.findOne({
      where: { id: productId },
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

export async function PUT(req) {
  try {
    const { productId, images } = await req.json();

    if (!productId || !images || images.length === 0) {
      return Response.json("Product ID and a non-empty array of images are required", { status: 400 });
    }

    const product = await Product.findByPk(productId);
    if (!product) {
      return Response.json(`Product with ID ${productId} does not exist`, { status: 404 });
    }

    const imagesToRemove = [];
    for (const image of images) {
      const img = await ProductImages.findOne({ where: { id: image.id } });
      imagesToRemove.push(img);
    }
    await product.removeProductImages(imagesToRemove);

    await Promise.all(
      imagesToRemove.map(async (image) => {
        await image.destroy();
      })
    );

    const updatedProduct = await Product.findOne({
      where: { id: productId },
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
