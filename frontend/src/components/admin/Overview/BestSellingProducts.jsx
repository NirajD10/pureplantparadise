import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import productimage from "@/assets/Images/plants/Ferm_morpankhi.jpg";

function BestSellingProducts() {
  return (
    <Table>
      <TableCaption>Hot Selling Products.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead className="w-[100px] text-right">Sold</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium flex flex-row gap-6">
            <img
              src={productimage}
              alt="product"
              className="h-20 w-fit bg-cover border border-[#121212]/30"
            />
             <div className="flex flex-col gap-2 justify-center">
              <p className="font-normal text-base">Fern Metade</p>
              <p className="font-normal text-lg">₹780</p>
            </div>
          </TableCell>
          <TableCell className="text-right"><div className="flex flex-col justify-start gap-2">
              <p className="font-normal text-base">7</p>
              <p className="font-normal text-base">Sold</p>
            </div></TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export default BestSellingProducts;
