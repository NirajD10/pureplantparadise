import React, { useCallback, useEffect, useRef, useState } from "react";

import ConnectForm from "../Products/FormComponents/ConnectForm";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { X } from "@phosphor-icons/react";

import { Badge } from "@/components/ui/badge";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import { useQuery } from "@tanstack/react-query";
import { getAdminInputAttributes } from "@/lib/admin-http";


function MultiSelect({ form, fieldname, className, isEditForm }) {
  const inputRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const watchCategoryInput = form.watch("categories");

  const {
    data: attributelist,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["attributes", { id: form.getValues("categories") }],
    queryFn: ({ signal }) =>
      getAdminInputAttributes({ id: form.getValues("categories"), signal }),
    enabled: typeof watchCategoryInput === "string" ? true : false,
  });

  useEffect(() => {
    if (isError) {
      toast.error(error.data.message);
    }
  }, [isError, error]);

  useEffect(() => {
    if(isEditForm) {
      const editattributeslist = form.getValues("attributes") || [];
      setSelected(editattributeslist);
    }
  }, [selected, setSelected]);

  const handleUnselect = useCallback((attribute) => {
    setSelected((prev) => prev.filter((s) => s.value !== attribute.value));
  }, []);

  const handleKeyDown = useCallback((e) => {
    const input = inputRef.current;
    if (input) {
      if (e.key === "Delete" || e.key === "Backspace") {
        if (input.value === "") {
          setSelected((prev) => {
            const newSelected = [...prev];
            newSelected.pop();
            return newSelected;
          });
        }
      }

      if (e.key === "Escape") {
        input.blur();
      }
    }
  }, []);

  const selectables = attributelist?.map((attribute) => {
    const filteredOptions = attribute.options
      .filter((option) => !selected.some((sel) => sel.value === option.value))
      .map(({ value, label }) => ({ value, label }));

    return {
      name: attribute.name,
      options: filteredOptions,
    };
  });

  return (
    <div className="col-span-2">
      <ConnectForm>
        {({ register, setValue }) => (
          <FormField
            control={form.control}
            name={fieldname}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Attributes</FormLabel>
                <FormControl>
                  <Command
                    onKeyDown={handleKeyDown}
                    className="overflow-visible bg-transparent"
                  >
                    <div className="group border border-[#121212]/25  px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                      <div className="flex gap-1 flex-wrap">
                        {selected.map((item) => {
                          return (
                            <Badge key={item.value} variant="secondary">
                              {item.label}
                              <button
                                className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    handleUnselect(item);
                                    //Register react hook field as removing item
                                    let removeItem = selected.filter(
                                      (s) => s.value !== item.value
                                    );
                                    setValue(fieldname, removeItem);
                                  }
                                }}
                                onMouseDown={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                }}
                                onClick={() => {
                                  handleUnselect(item);
                                  //Register react hook field as removing item
                                  let removeItem = selected.filter(
                                    (s) => s.value !== item.value
                                  );
                                  setValue(fieldname, removeItem);
                                }}
                              >
                                <X className="h-3 w-3 text-muted-foreground hover:text-whiteprimary" />
                              </button>
                            </Badge>
                          );
                        })}
                        <CommandPrimitive.Input
                          ref={inputRef}
                          value={inputValue}
                          onValueChange={setInputValue}
                          onBlur={() => setOpen(false)}
                          onFocus={() => setOpen(true)}
                          placeholder="Select Attributes..."
                          className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
                        />
                      </div>
                    </div>
                    <div className="relative mt-2">
                      {open && selectables?.length > 0 ? (
                        <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-whiteprimary shadow-md outline-none animate-in">
                          {/* {attributelist.map((attribute) => ( */}
                          {watchCategoryInput !== undefined &&
                            selectables.map((items) => (
                              <CommandGroup
                                key={items.name}
                                id={items.name}
                                heading={items.name}
                                className="h-full overflow-auto"
                              >
                                {items.options.map((item) => (
                                  <CommandItem
                                    key={item.value}
                                    onMouseDown={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                    }}
                                    onSelect={(value) => {
                                      setInputValue("");
                                      setSelected((prev) => [...prev, item]);
                                      //Register react hook field as adding item
                                      setValue(fieldname, [...selected, item]);
                                    }}
                                    className={"cursor-pointer"}
                                  >
                                    {item.label}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            ))}
                          {/* ))} */}
                        </div>
                      ) : null}
                      {open && selectables?.length === 0 ? (
                        <div className="absolute w-full z-10 top-0 rounded-md border border-slate-300/40 bg-popover text-whiteprimary shadow-md outline-none animate-in">
                          <CommandGroup className="h-full overflow-auto">
                            <p className="text-center text-base py-2">
                              No Attributes listed on that category. <br />
                              Please create new attribute in order to display.
                            </p>
                          </CommandGroup>
                        </div>
                      ) : null}
                      {open && watchCategoryInput === undefined && (
                        <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-whiteprimary shadow-md outline-none animate-in">
                          <CommandGroup className="h-full overflow-auto">
                            <p className="text-center text-base py-2">
                              Please Select Categories first.
                            </p>
                          </CommandGroup>
                        </div>
                      )}
                    </div>
                  </Command>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </ConnectForm>
    </div>
  );
}

export default MultiSelect;
