import React from "react";
import CustomerNote from "./CustomerNote";
import CustomerInfo from "./CustomerInfo";

function CustomerSection({customer_detail}) {
  return (
    <div className="px-2">
      <CustomerNote notes={customer_detail?.notes}/>
      <CustomerInfo info={customer_detail}/>
    </div>
  );
}

export default CustomerSection;
