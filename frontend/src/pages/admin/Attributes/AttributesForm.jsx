import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { toast } from "sonner";
import LoadingBar from "react-top-loading-bar";
import { zodResolver } from "@hookform/resolvers/zod";
import { attributeFormSchema } from "@/components/admin/Attributes/util";

/* UI Components */
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import InputRadioGroup from "@/components/admin/FormFields/InputRadioGroup";
import InputField from "@/components/inputfield/InputField";
import { CaretCircleLeft } from "@phosphor-icons/react";
import { queryClient } from "@/lib/http";
import { getAdminCategories } from "@/lib/admin-http";
import { useQuery } from "@tanstack/react-query";
import { postAttribute, putAttribute } from "@/lib/admin-http";

function AttributesForm() {
  const { id } = useParams();
  const isEditForm = id !== undefined;
  const [editSelectValue, setEditSelectValue] = useState();

  const { data: categorieslist } = useQuery({
    queryKey: ["categories"],
    queryFn: getAdminCategories,
  });

  const form = useForm({
    resolver: zodResolver(attributeFormSchema),
    defaultValues: async () => {
      if (isEditForm) {
        const token = localStorage.getItem("admin-token");
        if (!token) {
          toast.error("Missing Token. Couldn't fetch Data");
        }
        return fetch(
          `${import.meta.env.VITE_ADMIN_AUTH_API_URL}attributes/edit/` + id,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
          .then((res) => res.json())
          .then((json) => {
            setEditSelectValue(json.attribute_group.title);
            return {
              attributesname: json.name,
              attributescode: json.attribute_code,
              attribute_options: json.attribute_options,
              parentcategories: json.attribute_group.id,
              displaycustomer: json.display_customer,
            };
          });
      } else {
        return { attribute_options: [{ value: "" }] };
      }
    },
    mode: "onChange",
  });
  const loadingRef = useRef(null);
  const navigate = useNavigate();

  const { methods, setValue } = form;

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "attribute_options",
  });

  function onSubmit(data) {
    // alert(JSON.stringify(data, null, 2));

    // New Category API Call
    if (data && !isEditForm) {
      loadingRef.current.continuousStart();
      postAttribute(data)
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
    } // Edit Attribute API Call
    else if (data && isEditForm) {
      loadingRef.current.continuousStart();
      putAttribute(id, data)
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
                      fieldname="attributesname"
                    />
                    <InputField
                      form={form}
                      label="Attribute Code"
                      fieldname="attributescode"
                    />
                    <Separator className="my-6" />
                    {/* Update this select input that has do create or select */}
                    <div className="grid space-y-2 gap-2">
                      <p className="text-base font-bold "> Attribute Options</p>
                      <p className="text-sm">
                        Add attribute options on filter page. eg.(for Light-
                        Bright Indirect Light, Direct Sunlight)
                      </p>
                      {fields.map((field, index) => (
                        <FormField
                          control={form.control}
                          key={field.id}
                          name={`attribute_options.${index}.value`}
                          render={({ field }) => (
                            <FormItem className="!space-y-0 flex flex-row gap-2 items-center">
                              <FormControl className="flex-1">
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={() => remove(index)}
                              >
                                Remove
                              </Button>
                            </FormItem>
                          )}
                        />
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() => append({ value: "" })}
                      >
                        Add Attributes Group
                      </Button>
                    </div>
                    <Separator className="my-6" />
                    <div className="grid space-y-2 gap-2">
                      <p className="text-base font-bold ">Attribute Group</p>
                      <p className="text-sm">
                        Select groups the attribute belongs to
                      </p>
                      <FormField
                        control={form.control}
                        name="parentcategories"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                value={field.value}
                              >
                                <SelectTrigger className="w-[180px]">
                                  {isEditForm ? (
                                    <SelectValue
                                      placeholder="Select"
                                      aria-label={field.value}
                                    >
                                      {editSelectValue}
                                    </SelectValue>
                                  ) : (
                                    <SelectValue placeholder="Select" />
                                  )}
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
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="space-y-3">
                <Card>
                  <CardHeader className="font-bold">Settings</CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="displaycustomer"
                      render={({ field }) => (
                        <InputRadioGroup
                          field={field}
                          label="Display to Customer?"
                          optionOne={{ value: "no", label: "No" }}
                          optionTwo={{ value: "yes", label: "Yes" }}
                        />
                      )}
                    />
                  </CardContent>
                </Card>
              </div>
            </main>
            {!categorieslist ? (
              <p>Please create new Category before submitting</p>
            ) : (
              <Button variant="outline" type="submit">
                Save
              </Button>
            )}
          </form>
        </Form>
      </FormProvider>
    </div>
  );
}

export default AttributesForm;

export function loader() {
  return queryClient.fetchQuery({
    queryKey: ["categories"],
    queryFn: getAdminCategories,
  });
}
