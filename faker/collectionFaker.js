import { faker } from "@faker-js/faker";
import Collection from "../model/collectionModel.js";
import dotenv from "dotenv";
import connectMongoDB from "../connection/mongoDB.js";
import User from "../model/userModel.js";
dotenv.config({ path: "../../.env" });

connectMongoDB();

try {
  const totalData = 10;
  const collection = [];
  for (let i = 0; i < totalData; i++) {
    const collectionData = {
      productUrl: faker.image.imageUrl(),
      productName: faker.internet.userName(),
      productCategory: faker.internet.userName(),
    };
    collection.push(collectionData);
  }

  const createCollection = await Collection.create(collection);
  if (!createCollection) {
    throw new Error("Failed to generate Collection");
  }

  const userId = "6475839501a3e8a1eb0cd6d3";
  const userUpdate = await User.findByIdAndUpdate(
    userId,
    {
      $push: {
        collections: { $each: createCollection.map((col) => String(col._id)) },
      },
    },
    { new: true }
  );

  console.log("[32m%s[0m", "collectionFaker success");
  process.exit(1);
} catch (error) {
  console.log("[31m%s[0m", "collectionFaker failed : " + error.message);
  process.exit(1);
}
