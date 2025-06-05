import * as Yup from "yup";

export const schemaLogin = Yup.object({
  username: Yup.string().max(30).required("Username is required!"),

  password: Yup.string().max(20).required("Password is required!"),
});

export const schemaRegister = Yup.object({
  username: Yup.string().min(8, "username ต้องมีอย่างน้อย 8 ตัว").max(30).required("Username is required!"),

  password: Yup.string()
    .min(8, "รหัสผ่านต้องมีอย่างน้อย 8 ตัว")
    .max(20)
    .required("Password is required"),

  confirmPassword: Yup.string()
    .required("กรุณายืนยันรหัสผ่าน")
    .oneOf([Yup.ref("password")], "รหัสผ่านไม่ตรงกัน"),
});
