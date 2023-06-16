import { faker } from "@faker-js/faker";
import Product from "../model/productModel.js";
import dotenv from "dotenv";
import connectMongoDB from "../connection/mongoDB.js";
import Categories from "../model/categoriesModel.js";
dotenv.config({ path: "../../.env" });

connectMongoDB();

try {
  const totalData = 100;
  let product = [];
  const categoryFind = await Categories.find();
  for (let i = 0; i < totalData; i++) {
    const productData = {
      name: faker.internet.userName(),
      price: faker.datatype.number({ min: 0, max: 1000000 }),
      productUrl: [faker.image.imageUrl()],
      type: faker.datatype.string(),
      category:
        categoryFind[
          faker.datatype.number({ min: 0, max: categoryFind.length - 1 })
        ],
      maxRevision: faker.datatype.number({ min: 0, max: 7 }),
      descryption: faker.datatype.string(),
      dayWork: faker.datatype.number({ min: 0, max: 7 }),
    };
    product.push(productData);
  }

  const createProduct = await Product.create(product);
  if (!createProduct) {
    throw new Error("failed to generate Product");
  }
  console.log("[32m%s[0m", "productFaker success");
  process.exit(1);
} catch (error) {
  console.log("[31m%s[0m", "productFaker failed : " + error.message);
  process.exit(1);
}
