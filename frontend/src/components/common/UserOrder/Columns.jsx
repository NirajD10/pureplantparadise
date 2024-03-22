import { Link } from "react-router-dom";

export const columns = [
  {
    accessorKey: "order_number",
    header: ({ column }) => <p className="p-1">Order Number</p>,
    cell: ({ row }) => {
      return (
        <div className="font-normal text-center">
          <Link
            to={`${row.original._id}`}
            className="text-bgsecondary underline underline-offset-1 decoration-bgsecondary "
          >
            {row.original.order_number}
          </Link>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "order_status",
    header: ({ column }) => <p className="p-1 text-center">Status</p>,
    cell: ({ row }) => (
      <div className="flex space-x-2 text-center">
        <span className="w-full truncate font-normal text-center">
          {row.original.status}
        </span>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "price",
    header: ({ column }) => <p className="p-1 text-center">Total</p>,
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2 text-center">
          <span className="w-full truncate font-normal text-center">
            ₹{row.original.amount}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "order_placed",
    header: ({ column }) => <p className="p-1 text-center">Order Placed</p>,
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      const d = date.getDate();
      const m = date.getMonth() + 1;
      const y = date.getFullYear();
      return (
        <div className="flex items-center justify-center">
          <span className="w-full text-center">{`${d}/${m}/${y}`}</span>
        </div>
      );
    },
  },
];
