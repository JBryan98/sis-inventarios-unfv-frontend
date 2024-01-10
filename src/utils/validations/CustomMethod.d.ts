import { StringSchema } from "Yup";

declare module "yup" {
  interface StringSchema<TType, TContext, TDefault, TFlags> extends StringSchema{
    numeric(): this;
  }
}