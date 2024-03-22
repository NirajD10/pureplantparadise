import { Badge } from "@/components/ui/badge";

export function getBadgeCompoents(status) {
  switch (status) {
    case "paid":
      return (
        <Badge className="space-x-2">
          <div className="h-3 w-3 rounded-full border-2 border-whiteprimary"></div>
          <span className="capitalize">{status}</span>
        </Badge>
      );

    case "Successful":
      return (
        <Badge className="space-x-2">
          <div className="h-3 w-3 rounded-full border-2 border-whiteprimary"></div>
          <span className="capitalize">{status}</span>
        </Badge>
      );

    case "successful":
      return (
        <Badge className="space-x-2">
          <div className="h-3 w-3 rounded-full border-2 border-whiteprimary"></div>
          <span className="capitalize">{status}</span>
        </Badge>
      );

    case "Shipped":
      return (
        <Badge className="space-x-2 bg-yellow-600 border-yellow-600">
          <div className="h-3 w-3 rounded-full border-2 border-whiteprimary"></div>
          <span className="capitalize text-whiteprimary">{status}</span>
        </Badge>
      );

    case "Pending":
      return (
        <Badge
          variant="outline"
          className="space-x-2 bg-blue-500 border-blue-500"
        >
          <div className="h-3 w-3 rounded-full border-2 border-whiteprimary"></div>
          <span className="capitalize text-whiteprimary">{status}</span>
        </Badge>
      );

    case "Failed":
      return (
        <Badge variant="destructive" className="space-x-2">
          <div className="h-3 w-3 rounded-full border-2 border-whiteprimary"></div>
          <span className="capitalize">{status}</span>
        </Badge>
      );

    case "Processing":
      return (
        <Badge className="space-x-2">
          <div className="h-3 w-3 rounded-full border-2 border-whiteprimary"></div>
          <span className="capitalize">{status}</span>
        </Badge>
      );

    case "Delivered":
      return (
        <Badge className="space-x-2">
          <div className="h-3 w-3 rounded-full border-2 border-whiteprimary"></div>
          <span className="capitalize">{status}</span>
        </Badge>
      );
  }
}
