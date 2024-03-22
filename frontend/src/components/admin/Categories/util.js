import * as z from "zod";

/* React hook form validation using Z validator*/
export const categoryFormSchema = z.object({
  categoryname: z
    .string({ required_error: "Please enter category name." })
    .min(2, {
      message: "Category name must be at least 2 characters.",
    })
    .max(30, {
      message: "Category name must not be longer than 30 characters.",
    }),
  categoriesid: z.string({
    required_error: "Please enter categories of id.",
  }),
  description: z.string().min(10, { message: "Please enter description" }),
  breadcrumbbanner: z.any(),
  thumbnail: z.any(),
  status: z.enum(["enabled", "disabled"]).default("enabled"),
  menuinlcude: z.enum(["no", "yes"]).default("no"),
});

/* Quill Table toolbar */
export const toolbarOptions = [
  ["bold", "italic", "underline", "strike"],
  ["blockquote"],

  [{ align: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }],
  [{ indent: "-1" }, { indent: "+1" }],

  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  ["link", "image"],
];
