import React from 'react'
import TableComponent from "../Table/main";
import { columns } from "./Columns";

function AttributesList({attributesList}) {
  return (
    <>
      <TableComponent
        data={attributesList}
        columns={columns}
        filtertypename="name"
      />
    </>
  )
}

export default AttributesList