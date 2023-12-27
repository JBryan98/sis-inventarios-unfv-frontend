import { setLocale } from "Yup";

setLocale({
    mixed: {
        required: "Campo obligatorio"
    },
    number: {
        min: "El valor mínimo permitido es : ${min}",
        max: "El valor máximo permitido es : ${max}",
    },
    string: {
        email: "Formato incorrecto",
        min: "Debe tener como mínimo ${min} caracteres",
        max: "Debe tener como máximo ${max} caracteres",
    },
})