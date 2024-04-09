import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { isAdminRequest } from "./auth/[...nextauth]";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  await isAdminRequest(req, res);
  if (method == "POST") {
    const { title, description, price, images, category, properties } =
      req.body;
    const ProductDoc = await Product.create({
      title,
      description,
      price,
      images,
      category: category || undefined,
      properties,
    });
    res.json(ProductDoc);
  }

  if (method == "GET") {
    if (req.query?.id) {
      res.json(await Product.findOne({ _id: req.query.id }));
    } else {
      const Products = await Product.find();
      res.json(Products);
    }
  }

  if (method == "PUT") {
    const { title, description, price, images, category, properties, _id } =
      req.body;
    await Product.updateOne(
      { _id },
      {
        title,
        description,
        price,
        images,
        category: category || undefined,
        properties,
      }
    );
    res.json({ message: "Product updated" });
  }

  if (method == "DELETE") {
    if (req.query?.id) {
      await Product.deleteOne({ _id: req.query.id });
      res.json({ message: "Product deleted" });
    }
  }
}
