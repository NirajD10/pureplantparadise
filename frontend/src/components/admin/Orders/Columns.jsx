import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
// import { DataTableColumnHeader } from "./data-table-column-header";
// import { DataTableRowActions } from "./data-table-row-actions";

export const columns = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "order_number",
    header: ({ column }) => <p className="p-1">Order Number</p>,
    cell: ({ row }) => (
      <div className="w-[80px]">
        <Link
          to={`edit/${row.original._id}`}
          className="underline underline-offset-2 text-bgprimary"
        >
          {row.getValue("order_number")}
        </Link>
      </div>
    ),
    enableSorting: true,
    enableHiding: false,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => <p className="p-1">Date</p>,
    cell: ({ row }) => {
      // const label = labels.find((label) => label.value === row.original.label);
      const date = new Date(row.original.createdAt);
      const dd = date.getDate();
      const m = date.getMonth();
      const monthsNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const month = monthsNames[m];
      const year = date.getFullYear();
      return (
        <div>
          <span className="text-sm">{`${month} ${dd}, ${year}`}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => <p className="p-1">Customer email</p>,
    cell: ({ row }) => {
      return (
        <div className="flex w-[220px]  sm:w-[300px] items-center">
          <span>{row.getValue("email")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => <p className="p-1">Status</p>,
    cell: ({ row }) => {
      const label = row.original.status;
      let content;

      if (label === "Successful") {
        content = (
          <Badge className="space-x-2">
            <div className="h-3 w-3 rounded-full border-2 border-whiteprimary"></div>
            <span className="capitalize">{label}</span>
          </Badge>
        );
      } else if (label === "Pending") {
        content = (
          <Badge
            variant="outline"
            className="space-x-2 bg-blue-500 border-blue-500"
          >
            <div className="h-3 w-3 rounded-full border-2 border-whiteprimary"></div>
            <span className="capitalize text-whiteprimary">{label}</span>
          </Badge>
        );
      } else if (label === "Shipped") {
        content = (
          <Badge
            variant="outline"
            className="space-x-2 bg-yellow-600 border-yellow-600"
          >
            <div className="h-3 w-3 rounded-full border-2 border-whiteprimary"></div>
            <span className="capitalize text-whiteprimary">{label}</span>
          </Badge>
        );
      } else if (label === "Processing") {
        content = (
          <Badge className="space-x-2">
            <div className="h-3 w-3 rounded-full border-2 border-whiteprimary"></div>
            <span className="capitalize">{label}</span>
          </Badge>
        );
      } else if (label === "Delivered") {
        content = (
          <Badge className="space-x-2">
            <div className="h-3 w-3 rounded-full border-2 border-whiteprimary"></div>
            <span className="capitalize">{label}</span>
          </Badge>
        );
      }

      return <div className="flex items-center">{content}</div>;
    },
  },
  {
    accessorKey: "payment_status",
    header: ({ column }) => <p className="p-1">Payment Status</p>,
    cell: ({ row }) => {
      const label = row.original.paymentid.status;
      let content;

      if (label === "successful") {
        content = (
          <Badge className="space-x-2">
            <div className="h-3 w-3 rounded-full border-2 border-whiteprimary"></div>
            <span className="capitalize">{label}</span>
          </Badge>
        );
      } else if (label === "Pending") {
        content = (
          <Badge
            variant="outline"
            className="space-x-2 bg-blue-500 border-blue-500"
          >
            <div className="h-3 w-3 rounded-full border-2 border-whiteprimary"></div>
            <span className="capitalize text-whiteprimary">{label}</span>
          </Badge>
        );
      } else if (label === "Failed") {
        content = (
          <Badge variant="destructive" className="space-x-2">
            <div className="h-3 w-3 rounded-full border-2 border-whiteprimary"></div>
            <span className="capitalize">{label}</span>
          </Badge>
        );
      } else if (label === "Paid" || label === "paid") {
        content = (
          <Badge
            className="space-x-2"
          >
            <div className="h-3 w-3 rounded-full border-2 border-whiteprimary"></div>
            <span className="capitalize text-whiteprimary">{label}</span>
          </Badge>
        );
      }

      return <div className="flex items-center">{content}</div>;
    },
  },
  {
    accessorKey: "total",
    header: ({ column }) => <p className="p-1">Total</p>,
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span className="text-base">₹{row.original.amount}</span>
        </div>
      );
    },
  },
];

// {
//   accessorKey: "title",
//   header: ({ column }) => <p className="p-1">Title</p>,
//   cell: ({ row }) => {
//     const label = labels.find((label) => label.value === row.original.label);

//     return (
//       <div className="flex space-x-2">
//         {label && <Badge variant="outline">{label.label}</Badge>}
//         <span className="max-w-[500px] truncate font-medium">
//           {row.getValue("title")}
//         </span>
//       </div>
//     );
//   },
// },
