import { Product, Tags } from "@/db/models/models";

export async function GET() {
  try {
    const response = await Tags.findAll({
      include: { model: Product },
      order: [["createdAt", "DESC"]],
    });
    return response.length
      ? Response.json(response)
      : Response.json("Tags Not Found");
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

    const found = await Tags.findOne({ where: { name } });

    if (found) {
      return Response.json("Tag already exists", {
        status: 400,
      });
    }

    const tag = await Tags.create({ name });

    return Response.json(tag);
  } catch (error) {
    return Response.json(error.message, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const { id, name } = await req.json();

    if (!id) {
      return Response.json("Tag ID is required", { status: 400 });
    }

    if (!name) {
      return Response.json("Name field is required", { status: 400 });
    }

    const tagToUpdate = await Tags.findByPk(id);

    if (!tagToUpdate) {
      return Response.json(`Tag with ID ${id} does not exist`, { status: 404 });
    }

    tagToUpdate.name = name;
    await tagToUpdate.save();

    return Response.json(tagToUpdate);
  } catch (error) {
    return Response.json(error.message, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const tagId = searchParams.get("id");

    if (!tagId) {
      return Response.json("Tag ID is required", { status: 400 });
    }

    const tagToDelete = await Tags.findByPk(tagId);

    if (!tagToDelete) {
      return Response.json(`Tag with ID ${tagId} does not exist`, {
        status: 404,
      });
    }

    await tagToDelete.destroy();

    return Response.json("Tag deleted successfully");
  } catch (error) {
    return Response.json(error.message, { status: 500 });
  }
}
