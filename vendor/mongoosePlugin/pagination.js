import CustomError from "../customError.js";

const paginations = (query) => {
  if (query.page <= 0) query.page = 1;
  if (query.limit < 1) query.limit = 10;
  const page = query.page;
  const limit = query.limit;
  const skip = (page - 1) * limit;
  return { limit, skip };
};

export { paginations };

export default function paginatePlugin(schema, options) {
  schema.statics.paginate = async function (filter, query, config) {
    const pageCount = (query, totalDocument) =>
      query.limit ? Math.ceil(totalDocument / query.limit) : 1;

    const schemaFind = await this.find(filter, {}, paginations(query))
      .orFail(new CustomError(`${this.modelName} not found`, 404))
      .populate(config?.populate)
      .select(config?.select)
      .sort(config?.sort)
      .lean();

    const totalPages = pageCount(query, await this.countDocuments(filter));

    return {
      totalPages,
      currentPage: Number(query.page) || 1,
      list: schemaFind,
    };
  };

  return schema;
}
