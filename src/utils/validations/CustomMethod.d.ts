declare module "yup" {
  interface StringSchema<TType, TContext, TDefault, TFlags> {
    numeric(): this;
  }
}
