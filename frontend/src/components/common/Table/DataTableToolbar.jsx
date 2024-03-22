import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "@phosphor-icons/react";

function DataTableToolbar({ table, filtertype }) {
  const isFiltered = table.getState().columnFilters.length > 0;
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Enter Order Number..."
          value={table.getColumn(`${filtertype}`)?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn(`${filtertype}`)?.setFilterValue(event.target.value)
          }
          className="h-8 w-[250px]"
        />
        {isFiltered && (
          <Button
            variant="default"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3 flex flex-row justify-center items-center"
          >
            Reset
            <X
              className="ml-1 -translate-y-[0.6px]"
              size={16}
              color="#fcfcfc"
            />
          </Button>
        )}
      </div>
    </div>
  );
}

export default DataTableToolbar;
