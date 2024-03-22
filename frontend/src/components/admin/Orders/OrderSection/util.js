import * as z from "zod";

export const shipmentTrackingFormSchema = z.object({
  tracking_number: z.string({
    required_error: "Please enter tracking number.",
  }),
  carrier: z
    .string({
      required_error: "Please enter carrier name.",
    })
    .min(3, { message: "Min at least 6 character carrier" }),
});

export const statusOrderSchema = z.object({
  status: z.string().min(2, { message: "Please select order status" }),
});
