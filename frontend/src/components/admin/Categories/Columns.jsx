import { Checkbox } from "@/components/ui/checkbox";
import { clsx } from "clsx";
import { Link } from "react-router-dom";

import { Check, X } from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
// import { DataTableColumnHeader } from "./data-table-column-header";
// import { DataTableRowActions } from "./data-table-row-actions";

export const columns = [
  {
    accessorKey: "thumbnail_imageurl",
    header: ({ column }) => <p className="p-1"></p>,
    cell: ({ row }) => {
      return (
        <div className="w-32 sm:w-auto flex justify-center space-x-2">
          <img
            src={row.original.thumbnail_imageurl}
            className="w-28 h-28 bg-cover border-[0.5px] border-[#121212]/25 rounded-md"
            alt={row.original.title}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => <p className="p-1 text-center">Category Name</p>,
    cell: ({ row }) => (
      <div className="font-normal text-center">
        <Link
          to={`edit/${row.original.id}`}
          className="text-bgsecondary underline underline-offset-1 decoration-bgsecondary "
          reloadDocument
        >
          {row.original.title}
        </Link>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <p className="p-1 text-center">Status</p>,
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2 text-center">
          <span className="w-full truncate font-normal text-center">
            {row.getValue("status")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "ismenuinclude",
    header: ({ column }) => <p className="p-1 text-center">Include in Menu</p>,
    cell: ({ row }) => {
      let badgeContent;

      if (row.getValue("ismenuinclude") === "yes") {
        badgeContent = (
          <Badge className="uppercase gap-2">
            <Check size={18} color="#fcfcfc" />
            {row.getValue("ismenuinclude")}
          </Badge>
        );
      } else {
        badgeContent = (
          <Badge variant="destructive" className="uppercase gap-2">
            <X size={18} color="#fcfcfc" />
            {row.getValue("ismenuinclude")}
          </Badge>
        );
      }
      return (
        <div className="flex items-center justify-center">
            {badgeContent}
        </div>
      );
    },
    // filterFn: (row, id, value) => {
    //   return value.includes(row.getValue(id));
    // },
  },
];
