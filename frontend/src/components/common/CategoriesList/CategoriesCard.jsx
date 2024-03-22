import React from "react";
import { useMediaQuery } from "@uidotdev/usehooks";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

let content;

function TestPaymentDetailsCard() {
  const isResponsive = useMediaQuery("only screen and (max-width: 992px)");

  content = (
    <div className="px-2 flex flex-col justify-center text-[#121212]">
      <Tabs defaultValue="razorpay">
        <TabsList>
          <TabsTrigger value="razorpay">RazorPay</TabsTrigger>
          <TabsTrigger value="stripe">Stripe</TabsTrigger>
        </TabsList>
        <TabsContent value="razorpay">
          <div className="border-[0.5px] rounded border-slate-300 border-opacity-70 p-2 my-2">
            <h4 className="font-bold text-xl">Cards</h4>
            <p className="my-2">
              You can use one of the following test cards to test transactions
              for your integration in Test Mode.
            </p>
            <ul className="list-disc list-inside mb-2">
              <li>
                Use any valid expiration date in the future in the MM/YY format.
              </li>
              <li>Use any random CVV to create a successful payment.</li>
            </ul>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Card Network</TableHead>
                  <TableHead className="w-[100px]">
                    Domestic/
                    <br />
                    International
                  </TableHead>
                  <TableHead>Card Number</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Mastercard</TableCell>
                  <TableCell>Domestic</TableCell>
                  <TableCell>5267 3181 8797 5449</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Visa</TableCell>
                  <TableCell>Domestic</TableCell>
                  <TableCell>4111 1111 1111 1111</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Mastercard</TableCell>
                  <TableCell>International</TableCell>
                  <TableCell>
                    5555 5555 5555 4444
                    <br />
                    5105 1051 0510 5100
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Visa</TableCell>
                  <TableCell>International</TableCell>
                  <TableCell>
                    4012 8888 8888 1881
                    <br />
                    5104 0600 0000 0008
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div className="border-[0.5px] rounded border-slate-300 border-opacity-70 p-2 my-2">
            <h4 className="font-bold text-xl">Netbanking</h4>
            <p className="my-2">
              You can select any of the listed banks. After choosing a bank,
              Razorpay will redirect to a mock page where you can make the
              payment{" "}
              <code className="bg-gray-50 p-1 rounded font-bold">success</code>{" "}
              or a{" "}
              <code className="bg-gray-50 p-1 rounded font-bold">failure</code>.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="stripe">
          <div className="border-[0.5px] rounded border-slate-300 border-opacity-70 p-2 my-2">
            <h4 className="font-bold text-xl">Testing interactively</h4>
            <p className="my-2">
              When testing interactively, use a card number, such as{" "}
              <b>4242 4242 4242 4242</b>. Enter the card number in the Dashboard
              or in any payment form.
              <ul className="list-disc list-inside mb-2 my-2">
                <li>
                  Use a valid future date, such as <b>12/34</b>.
                </li>
                <li>
                  Use any three-digit CVC (four digits for American Express
                  cards).
                </li>
                <li>Use any value you like for other form fields.</li>
              </ul>
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
  return (
    <React.Fragment>
      {!isResponsive ? (
        <Dialog className="h-auto overflow-y-auto">
          <p className="text-base text-center">
            To read more details over test payment
          </p>
          <DialogTrigger className="float-left">
            <span className="px-2 text-base text-bgprimary underline">
              Learn More
            </span>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-bold text-2xl my-2">
                Test Payment details
              </DialogTitle>
              <DialogDescription>{content}</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer className="h-auto overflow-y-auto">
          <p className="text-base text-center">
            To read more details over test payment
          </p>
          <DrawerTrigger className="float-left">
            <span className="px-2 text-base text-bgprimary underline">
              Learn More
            </span>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle className="font-bold text-2xl my-2">
                Test Payment details
              </DrawerTitle>
              <DrawerDescription>{content}</DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <DrawerClose>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </React.Fragment>
  );
}

export default TestPaymentDetailsCard;
