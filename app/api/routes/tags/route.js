import { Product, Tags } from "@/db/models/models";

export async function GET() {
  try {
    const response = await Tags.findAll({
      include: { model: Product },
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
