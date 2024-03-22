import React, { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "sonner";
import LoadingBar from "react-top-loading-bar";

import { editProduct, getAdminCategories, postProduct } from "@/lib/admin-http";
import {
  profileFormSchema,
  toolbarOptions,
} from "@/components/admin/Products/util";

/* UI Components */
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import FileUploadComponent from "@/components/admin/Products/FormComponents/FileUploadComponent";
import InputRadioGroup from "@/components/admin/FormFields/InputRadioGroup";
import MangeInputQuantity from "@/components/admin/Products/FormComponents/MangeInputQuantity";
import InputField from "@/components/inputfield/InputField";
import ImageUpload from "@/components/admin/FormFields/ImageUpload";
import MultiSelect from "@/components/admin/FormFields/MultiSelect";

import { CaretCircleLeft } from "@phosphor-icons/react";

function ProductForm() {
  const { id } = useParams();
  const isEditForm = id !== undefined;

  const loadingRef = useRef(null);
  const navigate = useNavigate();

  const { data: categorieslist } = useQuery({
    queryKey: ["categories"],
    queryFn: getAdminCategories,
  });

  const form = useForm({
    resolver: zodResolver(profileFormSchema),
    mode: "onChange",
    defaultValues: async () => {
      if (isEditForm) {
        const token = localStorage.getItem("admin-token");
        if(!token) {
          toast.error("Token Doesn't Exits. Wouldn't Fetch Edit Form.");
          return null;
        }
        return fetch(
          `${import.meta.env.VITE_ADMIN_AUTH_API_URL}products/edit/` + id,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
          .then((res) => res.json())
          .then((json) => {
            return {
              productname: json.productname,
              sku: json.sku,
              price: json.price,
              weight: json.productdetails.weight,
              categories: json.categories[0].id,
              attributes: json.attributes,
              description: json.productdetails.description,
              shortdescription: json.productdetails.short_description,
              media: json.productdetails.mediaurl,
              featureimage: json.featuredimageUrl,
              status: json.productdetails.status,
              managestock: json.productdetails.mangestock,
              stockavailability:
                json.productdetails?.stock_availability || "no",
              quantity: json.productdetails?.quantity,
            };
          });
      } else {
        return {
          managestock: "no",
        };
      }
    },
  });

  const { methods, setValue } = form;

  function onSubmit(data) {
    if (data && !isEditForm) {
      loadingRef.current.continuousStart();

      postProduct(data)
        .then((resData) => {
          toast.success(resData.message);
          loadingRef.current.complete();
          setTimeout(() => {
            navigate("..");
          }, 1000);
        })
        .catch((error) => {
          loadingRef.current.complete();
          toast.error(error.message);
        });
    } else if (data && isEditForm) {
      loadingRef.current.continuousStart();

      editProduct(id, data)
        .then((resData) => {
          toast.success(resData.message);
          loadingRef.current.complete();
          setTimeout(() => {
            navigate("..");
          }, 1000);
        })
        .catch((error) => {
          loadingRef.current.complete();
          toast.error(error.message);
        });
    }
  }

  return (
    <div className="container my-12">
      <LoadingBar color="#003E29" ref={loadingRef} shadow={true} />
      <Link to=".." className="flex flex-row gap-2 items-center my-5">
        <CaretCircleLeft size={32} color="#121212" />
        <p className="font-normal text-xl">Back</p>
      </Link>
      <FormProvider {...methods} setValue={setValue}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <main className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="col-span-2">
                <Card>
                  <CardHeader className="font-bold">New Product</CardHeader>
                  <CardContent className="space-y-4 h-auto">
                    <InputField
                      form={form}
                      label="Name"
                      fieldname="productname"
                    />
                    <div className="grid sm:grid-cols-3 gap-2">
                      <InputField form={form} label="SKU" fieldname="sku" />
                      <InputField form={form} label="Price" fieldname="price" />
                      <InputField
                        form={form}
                        label="Weight (Kg)"
                        fieldname="weight"
                      />
                    </div>
                    <div className="grid sm:grid-cols-3 gap-2">
                      <FormField
                        control={form.control}
                        name="categories"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Categories</FormLabel>
                            <FormControl>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                value={field.value}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a Categories" />
                                </SelectTrigger>
                                <SelectContent>
                                  {categorieslist?.map((category) => (
                                    <SelectItem
                                      key={category._id}
                                      value={category._id}
                                    >
                                      {category.title}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <MultiSelect
                        form={form}
                        fieldname="attributes"
                        className="col-span-2"
                        isEditForm={isEditForm}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="shortdescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Short Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Brief products details over short term."
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            This short description will display after product
                            price.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <ReactQuill
                              theme="snow"
                              value={field.Value}
                              modules={{ toolbar: toolbarOptions }}
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Description will display on description tab.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
                <Card className="mt-10">
                  <CardHeader className="font-bold">Media</CardHeader>
                  <CardContent>
                    {isEditForm ? (
                      <React.Fragment>
                        <p>Coming Soon..</p>
                        <p>To edit media image</p>
                      </React.Fragment>
                    ) : (
                      <FileUploadComponent form={form} />
                    )}
                  </CardContent>
                </Card>
              </div>
              <div className="space-y-3">
                <Card>
                  <CardHeader className="font-bold">
                    Featured Product Image
                  </CardHeader>
                  <CardContent>
                    <ImageUpload
                      form={form}
                      fieldname="featureimage"
                      isEditForm={isEditForm}
                      imageAlt={form.getValues("productname")}
                    />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="font-bold">Product Status</CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <InputRadioGroup
                          field={field}
                          label="Status"
                          defaultValue="enabled"
                          optionOne={{ value: "disabled", label: "Disabled" }}
                          optionTwo={{ value: "enabled", label: "Enabled" }}
                        />
                      )}
                    />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="font-bold">Inventory</CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="managestock"
                      render={({ field }) => (
                        <InputRadioGroup
                          field={field}
                          label="Manage Stock?"
                          defaultValue="no"
                          optionOne={{ value: "no", label: "No" }}
                          optionTwo={{ value: "yes", label: "Yes" }}
                        />
                      )}
                    />
                    <Separator className="my-5" />
                    <FormField
                      control={form.control}
                      name="stockavailability"
                      render={({ field }) => (
                        <InputRadioGroup
                          field={field}
                          label="Stock Availability"
                          defaultValue="no"
                          optionOne={{ value: "no", label: "No" }}
                          optionTwo={{ value: "yes", label: "Yes" }}
                        />
                      )}
                    />
                    <MangeInputQuantity control={form.control} />
                  </CardContent>
                </Card>
              </div>
            </main>
            <Button variant="outline" type="submit">
              Save
            </Button>
          </form>
        </Form>
      </FormProvider>
    </div>
  );
}

export default ProductForm;

// const enteredData = Object.assign({}, data);
// delete enteredData.media;
// delete enteredData.featureimage;

// alert(JSON.stringify(data, 2, 0));

// const formData = new FormData();
// const mediaFiles = data.media;
// //image data append as media and featureimage
// mediaFiles.forEach((file, index) => {
//   formData.append("media", file);
// });
// formData.append("featureimage", data.featureimage);
// formData.append("productInputData", JSON.stringify(enteredData));

// //TODO: Add token to authorize this method
// fetch(`${import.meta.env.VITE_ADMIN_AUTH_API_URL}products/new`, {
//   method: "POST",
//   body: formData,
// })
//   .then((response) => {
//     return response.json();
//   })
//   .then((resData) => {
//     if (resData.status === 500 || resData.status === 404) {
//       throw new Error(resData.message);
//     } else if (resData.status === 422) {
//       throw new Error(resData.message);
//     } else {
//       toast.success(resData.message);
//       loadingRef.current.complete();
//       setTimeout(() => {
//         navigate("..");
//       }, 1000);
//     }
//   })
//   .catch((error) => {
//     loadingRef.current.complete();
//     toast.error(error.message);
//   });
