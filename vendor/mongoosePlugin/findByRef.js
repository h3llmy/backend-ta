export function MongooseFindByReference(schema) {
  if (schema.constructor.name !== "Schema")
    throw new Error('param "schema" type must be "Schema".');

  schema.pre(
    [
      "find",
      "findOne",
      "findOneAndUpdate",
      "countDocuments",
      "findOneAndDelete",
      "findOneAndRemove",
      "findOneAndReplace",
    ],
    async function (next) {
      const models = this.model.db.models;

      if (Object.keys(models ?? {}).length === 0)
        throw new Error(
          "The number of models accessed is 0 or does not exist."
        );

      const schema = this.model.schema;

      function getModel(obj) {
        let refKey = "";
        if (obj?.instance === "ObjectID") {
          const options = obj.options;
          if (options?.ref?.length) refKey = options.ref;
        } else if (obj?.$embeddedSchemaType) {
          return getModel(obj.$embeddedSchemaType);
        }
        return models[refKey];
      }

      function transPath2RefPath(paths, tSchema = schema) {
        let previousPath = [];
        while (paths.length > 0) {
          const path = paths.shift() ?? "";
          if (tSchema.path([...previousPath, path].join("."))) {
            previousPath.push(path);
          } else {
            const currentModel = getModel(tSchema.path(previousPath.join(".")));
            if (currentModel) {
              const result = [
                previousPath.join("."),
                ...transPath2RefPath([path, ...paths], currentModel.schema),
              ];
              return result;
            } else return [path];
          }
        }
        return previousPath;
      }

      async function lookup(prevPaths, conditions, cSchema = schema) {
        if (
          typeof conditions !== "object" ||
          conditions === null ||
          Object.keys(conditions).length === 0
        ) {
          return conditions;
        }

        const result = {};

        const prevPathsValue = cSchema.path(prevPaths.join("."));

        for (let [paths, value] of Object.entries(conditions)) {
          if (schema.path(paths)) {
          } else {
            const reduceResult = [
              ...transPath2RefPath(paths.split(".")),
              value,
            ].reduceRight((previousValue, currentValue) =>
              currentValue === "$"
                ? previousValue
                : { [currentValue]: previousValue }
            );
            [[paths, value]] = Object.entries(reduceResult);
          }

          const currentPathsArray = paths.startsWith("$")
            ? paths === "$"
              ? prevPaths
              : []
            : [...prevPaths, paths];

          const currentPathsString = currentPathsArray.join(".");

          const currentPathsValue = cSchema.path(currentPathsString);

          if (!paths.startsWith("$"))
            if (currentPathsValue === undefined) {
              const currentModel = getModel(prevPathsValue);
              if (currentModel) {
                const subCoditions = await lookup(
                  [],
                  value,
                  currentModel.schema
                );
                if (subCoditions) {
                  const ids = (
                    await currentModel.find({ [paths]: subCoditions }, "_id")
                  ).map((v) => v._id);

                  return { $in: ids };
                }
              }
            }

          if (Array.isArray(value))
            Object.assign(result, {
              [paths]: await Promise.all(
                value.map(
                  async (v) => await lookup(currentPathsArray, v, cSchema)
                )
              ),
            });
          else if (
            typeof value === "object" &&
            value !== null &&
            Object.keys(value).length > 0
          )
            Object.assign(result, {
              [paths]: Object.fromEntries(
                await Promise.all(
                  Object.entries(value).map(
                    async ([k, v]) =>
                      Object.entries(
                        await lookup(
                          currentPathsArray,
                          {
                            [k]: v,
                          },
                          cSchema
                        )
                      )[0]
                  )
                )
              ),
            });
          else result[paths] = value;
        }
        return result;
      }
      this._conditions = await lookup([], this._conditions);
      next();
    }
  );
}
