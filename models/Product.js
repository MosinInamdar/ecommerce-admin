const { Schema, model, models } = require("mongoose");

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    images: [{ type: String }],
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    properties: { type: Object },
  },
  {
    timestamps: true,
  }
);

export const Product = models.Product || model("Product", ProductSchema);
