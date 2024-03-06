import { Product } from "@/db/models/models";

export async function PUT(req) {
  try {
    const { price, quantity } = await req.json();

    if (typeof price === "number") {
      const products = await Product.findAll();

      for (const product of products) {
        const updatedPrice = product.price * (1 + price / 100);
        await product.update({ price: updatedPrice });
      }
    }

    if (typeof quantity === "number") {
      await Product.update({ quantity }, { where: {} });
    }

    return Response.json("Products updated successfully");
  } catch (error) {
    console.log(error);
    return Response.json(error.message, { status: 500 });
  }
}
