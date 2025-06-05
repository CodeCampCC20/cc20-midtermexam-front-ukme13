import * as Yup from 'yup'

export const schemaTask = Yup.object({
  taskName: Yup.string()
  .max(20)
  .required("Task title is required!"),
})