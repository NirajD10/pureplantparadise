import React, { useContext, useState } from "react";
import ConnectForm from "../Products/FormComponents/ConnectForm";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { XCircle } from "@phosphor-icons/react";

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType
);

function ImageUpload({ form, fieldname, isEditForm, imageAlt }) {
  const [files, setFiles] = useState([]);
  const [displayImage, setDisplayImage] = useState(isEditForm ? true : false);

  const acceptedFileTypes = ["image/*"];

  const removeEditImageHandler = (field) => {
    form.setValue(field.name, "");
    setDisplayImage(false);
  };

  const handleFileValidate = (file) => {
    const fileType = file.fileType;
    if (!acceptedFileTypes.includes(fileType)) {
      // Reject the file and show an error message
      return {
        message: "Only images are allowed",
        status: FilePond.create().STATUS_REJECTED,
      };
    }
    return true;
  };
  return (
    <ConnectForm>
      {({ register, setValue }) => (
        <FormField
          control={form.control}
          name={fieldname}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image (Single)</FormLabel>
              {/* <p>{field.value}</p> */}
              {isEditForm && displayImage ? (
                <div className="relative w-fit">
                  <XCircle
                    size={24}
                    color="#ff0000"
                    className="absolute -top-3 -right-3 bg-white rounded-full cursor-pointer"
                    onClick={() => removeEditImageHandler(field)}
                  />
                  <img
                    src={field.value}
                    alt={imageAlt}
                    className="w-32 bg-cover border-[0.5px] border-slate-300/70"
                  />
                </div>
              ) : null}
                <FormControl>
                    <FilePond
                      files={files}
                      onupdatefiles={(fileItems) => {
                        const filesdataextract = {
                          files: fileItems.map((fileItem) => fileItem?.file),
                        };
                        setFiles(filesdataextract.files);
                        setValue(fieldname, filesdataextract.files[0]);
                      }}
                      disabled={isEditForm && displayImage}
                      acceptedFileTypes={acceptedFileTypes}
                      allowMultiple={false}
                      onFileValidate={handleFileValidate}
                      labelIdle='Drag & Drop your images or <span class="filepond--label-action"> Browse </span>'
                      name={fieldname}
                    />
                  </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </ConnectForm>
  );
}

export default ImageUpload;
