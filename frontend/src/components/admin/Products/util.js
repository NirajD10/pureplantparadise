import * as z from "zod";

export const profileFormSchema = z.object({
  productname: z
    .string({ required_error: "Please enter product name." })
    .min(2, {
      message: "Product name must be at least 2 characters.",
    })
    .max(50, {
      message: "Product name must not be longer than 50 characters.",
    }),
  sku: z.string({
    required_error: "Please select an sku code.",
  }),
  price: z.coerce.number({
    required_error: "Please enter price",
    invalid_type_error: "Please enter price in number",
  }),
  weight: z.coerce.number({
    required_error: "Please enter weight",
    invalid_type_error: "Please enter weight number only",
  }),
  categories: z.string({ required_error: "Please select categories" }),
  attributes: z.array(
    z.object({
      value: z.string({ message: "Please enter a attributes options." }),
      label: z.string(),
    })
  ),
  description: z.string().min(10, { message: "Please enter description" }),
  shortdescription: z
    .string()
    .min(10, { message: "Please enter short description" }),
  media: z.any(),
  featureimage: z.any(),
  status: z
    .string({ required_error: "Please choose any one" })
    .default("enabled"),
  managestock: z
    .string({ required_error: "Please choose any one" })
    .default("no"),
  stockavailability: z
    .string({ required_error: "Please choose any one" })
    .default("no"),
  quantity: z.optional(
    z.coerce.number({
      required_error: "Please enter quantity",
      invalid_type_error: "Please enter quantity in number",
    })
  ),
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

  ["link"],
];
