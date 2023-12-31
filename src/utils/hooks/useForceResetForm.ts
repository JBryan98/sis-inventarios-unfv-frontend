import { FieldValues } from "react-hook-form";

export const useForceResetForm = () => {
  const resetValues = (values: FieldValues) => {
    const obj: any = {};
    Object.entries(values).forEach(([key, value]) => {
      const tipo = typeof value;
      switch (tipo) {
        case "string":
          obj[key] = "";
          break;
        case "number":
          obj[key] = "";
          break;
        case "boolean":
          obj[key] = undefined;
          break;
        default:
          if (Array.isArray(value)) {
            obj[key] = [];
          } else {
            obj[key] = null;
          }
          break;
      }
    });
    return obj;
  };

  return {
    resetValues
  }
};