import React from "react";
// import { Cross2Icon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
// import { priorities, statuses } from "../data/data"
// import { DataTableFacetedFilter } from "./data-table-faceted-filter"

function DataTableToolbar({ table, filtertype }) {
  const isFiltered = table.getState().columnFilters.length > 0;
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter..."
          value={table.getColumn(`${filtertype}`)?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn(`${filtertype}`)?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {/* {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities}
          />
        )} */}
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
      {filtertype === "productname" && <Link to="new"><Button>New Product</Button></Link>}
      {filtertype === "title" && <Link to="new"><Button>New Category</Button></Link>}
      {filtertype === "name" && <Link to="new"><Button>New Attribute</Button></Link>}
    </div>
  );
}

export default DataTableToolbar;
