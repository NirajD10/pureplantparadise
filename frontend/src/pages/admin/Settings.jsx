import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import LoadingBar from "react-top-loading-bar";
import { zodResolver } from "@hookform/resolvers/zod";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { Button } from "@/components/ui/button";
import {
  settingsFormSchema,
  toolbarOptions,
} from "@/components/admin/Settings/util";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import InputField from "@/components/inputfield/InputField";

// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { XCircle } from "@phosphor-icons/react";
import { toast } from "sonner";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

function Settings() {
  const loadingRef = useRef(null);
  // const [files, setFiles] = useState([]);
  // const [displayBannerImage, setDisplayBannerImage] = useState(false);

  const form = useForm({
    resolver: zodResolver(settingsFormSchema),
    mode: "onChange",
    defaultValues: async () => {
      const token = localStorage.getItem("admin-token");
      if (!token) {
        toast.error("Missing Token. Couldn't fetch Data");
        return null;
      }
      return fetch(`${import.meta.env.VITE_ADMIN_AUTH_API_URL}shop-settings`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => res.json())
        .then((json) => {
          if (!json) {
            return;
          }
          return {
            shipping_policy: json.shipping_policy,
            return_policy: json.return_policy,
            delivery_message: json.delivery_message,
            // bannerimage: json.banner_image,
          };
        });
    },
  });

  function onSubmit(data) {
    // alert(JSON.stringify(data, 0, 2));
    loadingRef.current.continuousStart();
    if (data) {
      fetch(`${import.meta.env.VITE_ADMIN_AUTH_API_URL}shop-settings/`, {
        method: "PUT",
        body: JSON.stringify({ inputdata: data }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((resData) => {
          loadingRef.current.complete();
          toast.success(resData.message);
        })
        .catch((error) => {
          loadingRef.current.complete();
          toast.error(error.message);
        });
    }
  }

  // const acceptedFileTypes = ["image/*"];

  // const removeEditImageHandler = (field) => {
  //   form.setValue(field.name, "");
  //   setDisplayImage(false);
  // };

  // const handleFileValidate = (file) => {
  //   const fileType = file.fileType;
  //   if (!acceptedFileTypes.includes(fileType)) {
  //     // Reject the file and show an error message
  //     return {
  //       message: "Only images are allowed",
  //       status: FilePond.create().STATUS_REJECTED,
  //     };
  //   }
  //   return true;
  // };

  return (
    <div className="container my-8">
      <LoadingBar color="#003E29" ref={loadingRef} shadow={true} />
      <div>
        <h2 className="text-2xl font-bold tracking-tight my-4">Settings</h2>
      </div>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <InputField
              form={form}
              label="Estimate Delivery Message"
              fieldname="delivery_message"
            />
            <Card className="mt-10">
              <CardHeader className="font-bold">Banner Image</CardHeader>

              <CardContent>
                <p className="text-center">Coming soon..</p>
                {/* TODO: Future to add Banner image */}
                {/* {displayBannerImage ? (
                  <div className="relative w-fit mt-2 mb-5">
                    <XCircle
                      size={24}
                      color="#ff0000"
                      className="absolute -top-3 -right-3 bg-white rounded-full cursor-pointer"
                      onClick={() => removeEditImageHandler(field)}
                    />
                    <img
                      src={form.getValues("bannerimage")}
                      alt={form.getValues("bannerimage")}
                      className="w-32 bg-cover border-[0.5px] border-slate-300/70"
                    />
                  </div>
                ) : null}
                <FormField
                  control={form.control}
                  name="bannerimage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Banner image for homepage</FormLabel>
                      <FormControl>
                        <FilePond
                          files={files}
                          onupdatefiles={(fileItems) => {
                            const files1 = {
                              files: fileItems.map(
                                (fileItem) => fileItem?.file
                              ),
                            };
                            setFiles(fileItems);
                            form.setValue("bannerimage", files1.files);
                          }}
                          allowMultiple={true}
                          acceptedFileTypes={acceptedFileTypes}
                          maxFiles={5}
                          onFileValidate={handleFileValidate}
                          name="bannerimage" // sets the file input name, it's filepond by default 
                          labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="font-bold">Shipping Policy</CardHeader>
              <CardContent className="h-auto">
                <FormField
                  control={form.control}
                  name="shipping_policy"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel></FormLabel>
                      <FormControl>
                        <ReactQuill
                          theme="snow"
                          value={field.Value}
                          modules={{ toolbar: toolbarOptions }}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Shipping policy will display on every products or other
                        pages.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="font-bold">Return Policy</CardHeader>
              <CardContent className="h-auto">
                <FormField
                  control={form.control}
                  name="return_policy"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <ReactQuill
                          theme="snow"
                          value={field.Value}
                          modules={{ toolbar: toolbarOptions }}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Returns policy will display on every products or other
                        pages.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Button variant="outline" type="submit">
              Update
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default Settings;
