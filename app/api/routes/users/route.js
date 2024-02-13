import { User } from "@/db/models/models";
import { Op } from "sequelize";

export async function GET(req) {
  try {
    const { name } = req.nextUrl.searchParams;

    let whereClause = {};
    if (name) {
      whereClause = {
        [Op.or]: [
          { name: { [Op.substring]: name } },
          { surname: { [Op.substring]: name } },
          { email: { [Op.substring]: name } },
        ],
      };
    }

    const users = await User.findAll({
      where: whereClause,
      order: [["createdAt", "DESC"]],
    });

    return users.length
      ? Response.json(users)
      : Response.json("Users Not Found");
  } catch (error) {
    return Response.json(error.message, { status: 500 });
  }
}
