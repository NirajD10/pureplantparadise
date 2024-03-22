import * as z from "zod";

export const settingsFormSchema = z.object({
  shipping_policy: z.string().optional(),
  return_policy: z.string().optional(),
  delivery_message: z
    .string({
      required_error: "Please select an sku code.",
    })
    .optional(),
  //   attributes: z.array(
  //     z.object({
  //       value: z.string({ message: "Please enter a attributes options." }),
  //       label: z.string(),
  //     })
  //   ),
  bannerimage: z.any(),
//   description: z.string().min(10, { message: "Please enter description" }),
//   shortdescription: z
//     .string()
//     .min(10, { message: "Please enter short description" }),
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
