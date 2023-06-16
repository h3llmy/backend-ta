export const successResponse = (data, message) => {
  const response = {
    message,
    data,
  };
  return response;
};

export const errorResponse = (message) => {
  delete message?.statusCode;
  console.log(
    "\x1b[31m%s\x1b[0m",
    "Error : " + message.message,
    new Error().stack.replace("Error", "")
  );
  if (typeof message === "string") {
    return { message: message };
  }
  if (typeof message === "object") {
    if (message.code == 11000) {
      const duplicateValues = (obj) => {
        const result = {};
        Object.entries(obj).forEach(([key, value]) => {
          result[key] = `duplicate value ${value}`;
        });
        return result;
      };
      return {
        message: "duplicate key error collection",
        path: duplicateValues(message.keyValue),
      };
    }
    if (message.message.includes("validation failed")) {
      const errorMessage = message.message.split(", ");
      const keyValue = errorMessage[0].split(":")[0];
      return {
        [keyValue]: [
          errorMessage.map(
            (msg) => msg.replace(keyValue + ": ", "").split(": ")[1]
          ),
        ],
      };
    }
    if (message.message.includes("error validations")) {
      return message;
    } else {
      return {
        message: message.message,
        path: message?.path,
      };
    }
  }
  return { message: message.message };
};
