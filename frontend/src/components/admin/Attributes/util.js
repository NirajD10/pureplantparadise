import * as z from "zod";

/* React hook form validation using Z validator*/
export const attributeFormSchema = z.object({
  attributesname: z
    .string({ required_error: "Please enter category name." })
    .min(2, {
      message: "Attribute name must be at least 2 characters.",
    })
    .max(30, {
      message: "Attribute name must not be longer than 30 characters.",
    }),
  attributescode: z.string({
    required_error: "Please enter an attribute code.",
  }),
  attribute_options: z
    .array(
      z.object({
        value: z
          .string({ message: "Please enter a attributes options." })
      })
    )
    .optional(),
  parentcategories: z
    .string()
    .min(2, { message: "Please select attribute group" }),
  displaycustomer: z.enum(["no", "yes"]),
});
