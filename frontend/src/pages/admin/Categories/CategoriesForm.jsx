import React, { useContext, useEffect, useRef, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "sonner";
import LoadingBar from "react-top-loading-bar";

import {
  categoryFormSchema,
  toolbarOptions,
} from "@/components/admin/Categories/util";

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
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";

import InputRadioGroup from "@/components/admin/FormFields/InputRadioGroup";
import InputField from "@/components/inputfield/InputField";
import ImageUpload from "@/components/admin/FormFields/ImageUpload";

import { CaretCircleLeft } from "@phosphor-icons/react";
import { postnewCategory, putCatgory } from "@/lib/admin-http";

function CategoriesForm() {
  const { id } = useParams();
  const isEditForm = id !== undefined;

  const form = useForm({
    resolver: zodResolver(categoryFormSchema),
    mode: "onChange",
    defaultValues: async () => {
      if (isEditForm) {
        const token = localStorage.getItem("admin-token");
        if (!token) {
          toast.error("Missing Token. Couldn't fetch data.");
        }
        return fetch(
          `${import.meta.env.VITE_ADMIN_AUTH_API_URL}categories/edit/` + id,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
          .then((res) => res.json())
          .then((json) => {
            return {
              categoryname: json.title,
              categoriesid: json.categoriesid,
              description: json.description,
              breadcrumbbanner: json.category_bannerurl,
              thumbnail: json.thumbnail_imageurl,
              status: json.status,
              menuinlcude: json.ismenuinclude,
            };
          });
      }
    },
  });

  const { methods, setValue } = form;

  const loadingRef = useRef(null);
  const navigate = useNavigate();

  function onSubmit(data) {
    // alert(JSON.stringify(data, 2, 0));

    // New Category API Call
    if (data && !isEditForm) {
      loadingRef.current.continuousStart();
      postnewCategory(data)
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
    } // Edit Category API Call
    else if (data && isEditForm) {
      loadingRef.current.continuousStart();
      putCatgory(id, data)
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
                  <CardHeader className="font-bold">General</CardHeader>
                  <CardContent className="space-y-4 h-auto">
                    <InputField
                      form={form}
                      label="Name"
                      fieldname="categoryname"
                    />
                    <div className="grid space-y-2 gap-2">
                      <InputField
                        form={form}
                        label="Category ID (unique key)"
                        fieldname="categoriesid"
                        disabled={isEditForm ? true : false}
                      />
                    </div>

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
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
                <Card className="mt-10">
                  <CardHeader className="font-bold">Category Banner</CardHeader>
                  <CardContent>
                    <ImageUpload
                      form={form}
                      fieldname="breadcrumbbanner"
                      isEditForm={isEditForm}
                      imageAlt={form.getValues("categoryname")}
                    />
                  </CardContent>
                </Card>
              </div>
              <div className="space-y-3">
                <Card>
                  <CardHeader className="font-bold">Thumbnail Image</CardHeader>
                  <CardContent>
                    <ImageUpload
                      form={form}
                      fieldname="thumbnail"
                      isEditForm={isEditForm}
                      imageAlt={form.getValues("categoryname")}
                    />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="font-bold">Status</CardHeader>
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
                    <Separator className="my-5" />
                    <FormField
                      control={form.control}
                      name="menuinlcude"
                      render={({ field }) => (
                        <InputRadioGroup
                          field={field}
                          label="Include in Store menu"
                          defaultValue="no"
                          optionOne={{ value: "no", label: "No" }}
                          optionTwo={{ value: "yes", label: "Yes" }}
                        />
                      )}
                    />
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

export default CategoriesForm;

// Backup code -
/* 
if (data) {
  loadingRef.current.continuousStart();
  //copy object and delete two property(thumbnail and breadcrumbanner [nothing value there]) to be sent json data.
  const enteredData = Object.assign({}, data);
  delete enteredData.thumbnail;
  delete enteredData.breadcrumbbanner;

  const formData = new FormData();
  //image data append as thumbnail and breadcrumbbanner
  formData.append("thumbnail", data.thumbnail);
  formData.append("breadcrumbbanner", data.breadcrumbbanner);
  formData.append("inputdata", JSON.stringify(enteredData));

  //TODO: Add token to authorize this method
  fetch(`${import.meta.env.VITE_ADMIN_AUTH_API_URL}categories`, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      return response.json();
    })
    .then((resData) => {
      if (resData.status === 500 || resData.status === 404) {
        throw new Error(resData.message);
      } else if (resData.status === 422) {
        throw new Error(resData.message);
      } else {
        toast.success(resData.message);
        loadingRef.current.complete();
        setTimeout(() => {
          navigate("..");
        }, 1000);
      }
    })
    .catch((error) => {
      loadingRef.current.complete();
      toast.error(error.message);
    });
}

*/
