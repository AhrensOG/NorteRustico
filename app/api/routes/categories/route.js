import { Categories, Product } from "@/db/models/models";

export async function GET() {
  try {
    const response = await Categories.findAll({
      include: { model: Product },
      order: [["createdAt", "DESC"]],
    });
    return response.length
      ? Response.json(response)
      : Response.json("Categories Not Found");
  } catch (error) {
    return Response.json(error.message, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { name } = await req.json();

    if (!name) {
      return Response.json("Missing Data / All fields are required", {
        status: 400,
      });
    }

    const found = await Categories.findOne({ where: { name } });

    if (found) {
      return Response.json("Category already exists", {
        status: 400,
      });
    }

    const category = await Categories.create({ name });

    return Response.json(category);
  } catch (error) {
    return Response.json(error.message, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const { id, name } = await req.json();

    if (!id) {
      return Response.json("Category ID is required", { status: 400 });
    }

    if (!name) {
      return Response.json("Name field is required", { status: 400 });
    }

    const categoryToUpdate = await Categories.findByPk(id);

    if (!categoryToUpdate) {
      return Response.json(`Tag with ID ${id} does not exist`, { status: 404 });
    }

    categoryToUpdate.name = name;
    await categoryToUpdate.save();

    return Response.json(categoryToUpdate);
  } catch (error) {
    return Response.json(error.message, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const categoryId = searchParams.get("id");

    if (!categoryId) {
      return Response.json("Category ID is required", { status: 400 });
    }

    const categoryToDelete = await Categories.findByPk(categoryId);

    if (!categoryToDelete) {
      return Response.json(`Category with ID ${categoryId} does not exist`, {
        status: 404,
      });
    }

    await categoryToDelete.destroy();

    return Response.json("Category deleted successfully");
  } catch (error) {
    return Response.json(error.message, { status: 500 });
  }
}
