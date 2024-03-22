import { Checkbox } from "@/components/ui/checkbox";
import { clsx } from "clsx";
import { Link } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
// import { DataTableColumnHeader } from "./data-table-column-header";
// import { DataTableRowActions } from "./data-table-row-actions";

export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "full_name",
    header: ({ column }) => <p className="p-1">Full Name</p>,
    cell: ({ row }) => (
      <div className="font-normal">
        <Link
          to={`${row.original._id}`}
          className="text-bgsecondary underline underline-offset-1 decoration-bgsecondary "
        >
          {row.getValue("full_name")}
        </Link>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "email",
    header: ({ column }) => <p className="p-1">Email</p>,
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-normal">
            {row.getValue("email")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => <p className="p-1">Status</p>,
    cell: ({ row }) => {
      let badgeContent;
      if (row.getValue("status") === "active") {
        badgeContent = (
          <Badge className="uppercase">{row.getValue("status")}</Badge>
        );
      } else {
        badgeContent = (
          <Badge variant="destructive" className="uppercase">
            {row.getValue("status")}
          </Badge>
        );
      }
      return <div className="flex w-[100px] items-center">{badgeContent}</div>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => <p className="p-1">Created At</p>,
    cell: ({ row }) => {
      const convertDate = new Date(row.getValue("createdAt"));
      const timestamp = convertDate.toLocaleDateString();
      return (
        <div className="flex items-center px-2">
          <span className="">{timestamp}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
];
