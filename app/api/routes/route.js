import { User } from "@/db/models/models";

export async function GET() {
  try {
    const data = await User.findAll();
    return Response.json(data);
  } catch (error) {
    return Response.error(error)
  }
}
