import { Checkbox } from "@/components/ui/checkbox";
import { clsx } from "clsx";
import { Link } from "react-router-dom";
import DeleteProductAction from "./DeleteProductAction"
// import { DataTableColumnHeader } from "./data-table-column-header";
// import { DataTableRowActions } from "./data-table-row-actions";

export const columns = [
  {
    accessorKey: "image",
    header: ({ column }) => <p className="p-1"></p>,
    cell: ({ row }) => {
      return (
        <div className="w-[80px] lg:w-auto flex justify-center space-x-2">
          <img
            src={row.original.featuredimageUrl}
            className="w-20 h-20 bg-cover border-[0.5px] border-[#121212]/25"
            alt={row.original.productname}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "productname",
    header: ({ column }) => <p className="p-1 text-center">Product Name</p>,
    cell: ({ row }) => (
      <div className="font-normal text-center">
        <Link
          to={`edit/${row.original._id}`}
          className="text-bgsecondary underline underline-offset-1 decoration-bgsecondary "
        >
          {row.original.productname}
        </Link>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "price",
    header: ({ column }) => <p className="p-1 text-center">Price</p>,
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2 text-center">
          <span className="w-full truncate font-normal text-center">
            ₹{row.getValue("price")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "sku",
    header: ({ column }) => <p className="p-1 text-center">SKU</p>,
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center">
          <span className="w-full text-center">
            {row.original.sku}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => <p className="p-1 text-center">Quantity</p>,
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center">
          <span className="">{row.original.productdetails.quantity ? row.original.productdetails.quantity : "No Set Quantity"}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => <p className="p-1 text-center">Status</p>,
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2 text-center">
          <span className="w-full truncate font-normal">
            {row.original.productdetails.status}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "delete",
    header: ({ column }) => <p className="p-1 text-center">Operation</p>,
    cell: ({ row }) => {
      return <DeleteProductAction id={row.original?._id} />;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
];
