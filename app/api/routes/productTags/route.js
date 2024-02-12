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
    const { productId, tagsList } = await req.json();

    if (!productId || !tagsList || !tagsList.length) {
      return Response.json(
        "Product is required / Tags list is required",
        {
          status: 400,
        }
      );
    }

    const product = await Product.findByPk(productId);

    if (!product) {
      return Response.json(`Product with ID ${productId} doesn't exists`, {
        status: 400,
      });
    }

    const tagsIds = [];
    for (const tag of tagsList) {
      if (!tag.id) {
        return Response.json(`Each tag must have ID`, {
          status: 400,
        });
      }
      const tagExists = await Tags.findByPk(tag.id);
      if (!tagExists) {
        return Response.json(`Tag with ID ${tag.id} doesn't exist`, {
          status: 400,
        });
      }
      tagsIds.push(tag.id);
    }

    const tagsToAdd = await Tags.findAll({
      where: { id: tagsIds },
    });
    await product.addTags(tagsToAdd);

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
    const { productId, tagsList } = await req.json();

    if (!productId || !tagsList || !tagsList.length) {
      return Response.json(
        "Product is required / Tags list is required",
        {
          status: 400,
        }
      );
    }

    const product = await Product.findByPk(productId);

    if (!product) {
      return Response.json(`Product with ID ${productId} doesn't exists`, {
        status: 400,
      });
    }

    const tagsIds = [];
    for (const tag of tagsList) {
      if (!tag.id) {
        return Response.json(`Each tag must have ID`, {
          status: 400,
        });
      }
      const tagExists = await Tags.findByPk(tag.id);
      if (!tagExists) {
        return Response.json(`Tag with ID ${tag.id} doesn't exist`, {
          status: 400,
        });
      }
      tagsIds.push(tag.id);
    }

    const tagsToRemove = await Tags.findAll({
      where: { id: tagsIds },
    });
    await product.removeTags(tagsToRemove);

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
