import React, { useEffect, useState } from "react";
import { columns } from "./Columns";
import TableComponent from "../Table/main";

function CustomerListTable({customerlist}) {
  return (
    <>
      <TableComponent
        data={customerlist}
        columns={columns}
        filtertypename="email"
      />
    </>
  );
}

export default CustomerListTable;
