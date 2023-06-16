import request from "supertest";
import server from "../vendor/server.js";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import Product from "../model/productModel.js";
import { faker } from "@faker-js/faker";
import fs from "fs";

const file = fs.createReadStream(
  '"current", ../../public/image/1678613977277-__yuuka_blue_archive_drawn_by_amonitto__sample-8a8247ab1c40e8ee7ad019f04f9c4d8d.jpg'
);

const productAddSchema = {
  name: faker.name.jobTitle(),
  price: faker.datatype.number(),
  type: "image",
  category: "drawing",
  maxRevision: 3,
  dayWorok: 9,
  productFile: file,
};
describe("FEATURE /product ", () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe("/get /product /list", () => {
    it("should get 404", async () => {
      const response = await request(server).get("/api/v1/product/list");
      expect(response.statusCode).toBe(404);
    });

    it("should get 200 ", async () => {
      const newProduct = await Product.create(productAddSchema);
      const response = await request(server).get(`/api/v1/product/list`);
      expect(response.statusCode).toBe(200);
      newProduct.remove();
    });
  });

  describe("/post /product /add", () => {
    it("should get 401", async () => {
      const response = await request(server)
        .post("/api/v1/product/add")
        .send(productAddSchema);
      expect(response.statusCode).toBe(401);
    });

    it("should get 200 ", async () => {
      const response = await request(server)
        .post(`/api/v1/product/add`)
        .send(productAddSchema);
      // .set()
      expect(response.statusCode).toBe(200);
    });
  });
});
