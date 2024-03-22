import { Checkbox } from "@/components/ui/checkbox";

import { Link } from "react-router-dom";

import { Check, X } from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import DeleteAttributeAction from "./DeleteAttributeAction";


// import { DataTableColumnHeader } from "./data-table-column-header";
// import { DataTableRowActions } from "./data-table-row-actions";

export const columns = [
  {
    accessorKey: "name",
    header: ({ column }) => <p className="p-1 text-center">Attribute Name</p>,
    cell: ({ row }) => (
      <div className="font-normal text-center">
        <Link
          to={`edit/${row.original?._id}`}
          className="text-bgsecondary underline underline-offset-1 decoration-bgsecondary "
        >
          {row.original?.name}
        </Link>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "attribute_group",
    header: ({ column }) => <p className="p-1 text-center">Attribute Group</p>,
    cell: ({ row }) => {
      const attributeGroup = row.getValue("attribute_group");
      const title = attributeGroup ? attributeGroup.title : null;
      return (
        <div className="flex space-x-2 text-center">
          <span className="w-full truncate font-normal text-center">
            {title}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "display_customer",
    header: ({ column }) => <p className="p-1 text-center">Display Status</p>,
    cell: ({ row }) => {
      let badgeContent;

      if (row.getValue("display_customer") === "yes") {
        badgeContent = (
          <Badge className="uppercase gap-2">
            <Check size={16} color="#fcfcfc" />
            {row.getValue("display_customer")}
          </Badge>
        );
      } else {
        badgeContent = (
          <Badge variant="destructive" className="uppercase">
            <X size={16} color="#fcfcfc" />
            {row.getValue("display_customer")}
          </Badge>
        );
      }
      return (
        <div className="flex items-center justify-center">{badgeContent}</div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "delete",
    header: ({ column }) => <p className="p-1 text-center">Operation</p>,
    cell: ({ row }) => {
      return <DeleteAttributeAction id={row.original?._id} />;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
];
