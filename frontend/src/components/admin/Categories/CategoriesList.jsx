import React from "react";

import TableComponent from "../Table/main";
import { columns } from "./Columns";

function CategoriesList({ categorieslist }) {
  return (
    <>
      <TableComponent
        data={categorieslist}
        columns={columns}
        filtertypename="title"
      />
    </>
  );
}

export default CategoriesList;
