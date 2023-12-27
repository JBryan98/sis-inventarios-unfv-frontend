import {addMethod, string } from "Yup";

addMethod(string, "numeric", function () {
  return this.matches(/^\d+$/, "Solo estan permitidos números");
});