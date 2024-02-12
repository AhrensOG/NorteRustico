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
    const { productId, categoriesList } = await req.json();

    if (!productId || !categoriesList || !categoriesList.length) {
      return Response.json(
        "Product is required / Categories list is required",
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

    const categoryIds = [];
    for (const category of categoriesList) {
      if (!category.id) {
        return Response.json(`Each category must have ID`, {
          status: 400,
        });
      }
      const categoryExists = await Categories.findByPk(category.id);
      if (!categoryExists) {
        return Response.json(`Category with ID ${category.id} doesn't exist`, {
          status: 400,
        });
      }
      categoryIds.push(category.id);
    }

    const categoriesToAdd = await Categories.findAll({
      where: { id: categoryIds },
    });
    await product.addCategories(categoriesToAdd);

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
    const { productId, categoriesList } = await req.json();

    if (!productId || !categoriesList || !categoriesList.length) {
      return Response.json(
        "Product is required / Categories list is required",
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

    const categoryIds = [];
    for (const category of categoriesList) {
      if (!category.id) {
        return Response.json(`Each category must have ID`, {
          status: 400,
        });
      }
      const categoryExists = await Categories.findByPk(category.id);
      if (!categoryExists) {
        return Response.json(`Category with ID ${category.id} doesn't exist`, {
          status: 400,
        });
      }
      categoryIds.push(category.id);
    }

    const categoriesToRemove = await Categories.findAll({
      where: { id: categoryIds },
    });
    await product.removeCategories(categoriesToRemove);

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
