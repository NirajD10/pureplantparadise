import React from "react";
import { useDispatch } from "react-redux";
import { cartReduxActions } from "@/features/shop/cartSlices";

import { Table } from "keep-react";
import { Trash } from "phosphor-react";

import QuantityInput from "../Products/QuantityInput";

function CartTable({ cartdata }) {
  const dispatch = useDispatch();
  return (
    <Table showCheckbox={false} hoverable={true}>
      <Table.Head className="bg-bgprimary !text-center">
        <Table.HeadCell className="min-w-[290px]">
          <p className="text-base font-medium text-whiteprimary">Product</p>
        </Table.HeadCell>
        <Table.HeadCell className="min-w-[152px] text-base text-whiteprimary">
          Price
        </Table.HeadCell>
        <Table.HeadCell className="min-w-[150px] text-base text-whiteprimary">
          Quantity
        </Table.HeadCell>
        <Table.HeadCell className="min-w-[150px] text-base text-whiteprimary"></Table.HeadCell>
        <Table.HeadCell className="min-w-[150px] text-base text-whiteprimary flex flex-row justify-center">
          Total
        </Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y divide-gray-50 border border-[#121212]/20">
        {cartdata.length === 0 && (
          <Table.Row className="min-w-[500px] text-base  text-center">
            No items. please add product
          </Table.Row>
        )}
        {cartdata.map((item) => (
          <Table.Row key={item._id} className="bg-white">
            <Table.Cell>
              <div className="flex">
                <div className="flex items-center gap-4">
                  <img
                    src={item.featuredimageUrl}
                    alt={item.productname}
                    className="w-20"
                  />
                  <div>
                    <p className="font-base font-bold">{item.productname}</p>
                  </div>
                </div>
              </div>
            </Table.Cell>
            <Table.Cell>
              <p className="text-light text-base">₹{item.price}</p>
            </Table.Cell>
            <Table.Cell>
              <QuantityInput quantity={item.quantity} id={item._id} />
            </Table.Cell>
            <Table.Cell>
              <button
                onClick={() =>
                  dispatch(cartReduxActions.removeCartItems(item._id))
                }
              >
                <Trash size={24} color="#121212" className="cursor-pointer" />
              </button>
            </Table.Cell>
            <Table.Cell>
              <div className="flex flex-col items-center gap-3">
                <p className="text-light text-base">
                  ₹{item.quantity * item.price}
                </p>
              </div>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

export default CartTable;
