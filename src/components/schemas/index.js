import * as yup from "yup"

export const basicSchema = yup.object({
  email: yup.string().email("please enter a valid email").required("Required"),
  name: yup.string().required("Required"),
  password: yup.string().min(5).required("Required"),
})
