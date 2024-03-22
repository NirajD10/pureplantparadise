import React, { useEffect, useState } from "react";
import TableComponent from "../Table/main";
// import { productlist } from "@/data/datalist";
import { columns } from "./Columns";

let url = import.meta.env.VITE_BACKEND || import.meta.env.BACKEND;

function ProductsList() {
  const [productlist, setProductlist] = useState([]);
  useEffect(() => {
    async function getlist() {
      const token = localStorage.getItem("admin-token");
      const response = await fetch(
        `${import.meta.env.VITE_ADMIN_AUTH_API_URL}products`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const data = await response.json();
      setProductlist(data);
    }
    getlist();
  }, []);
  return (
    <>
      <TableComponent
        data={productlist}
        columns={columns}
        filtertypename="productname"
      />
    </>
  );
}

export default ProductsList;
