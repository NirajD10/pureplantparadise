import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Header from "../components/common/Checkout/Header";

import ContactInformation from "../components/common/Checkout/Form/ContactInformation";
import Shipment from "../components/common/Checkout/Form/Shipment";
import PaymentSelect from "../components/common/Checkout/Form/PaymentSelect";
import Summary from "@/components/common/Checkout/Summary.jsx";

let content;

function Checkout() {
  
  const [isCartDataExists, setIsCartDataExists] = useState(false);
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);
  const { checkoutformStage } = useSelector((state) => state.checkout);
  const [stage, setStage] = useState(checkoutformStage);

  useEffect(() => {
    setStage(checkoutformStage);
  }, [checkoutformStage]);

  useEffect(() => {
    if (items.length > 0) {
      setIsCartDataExists(true);
    } else {
      navigate("/cart");
    }
  }, [items, isCartDataExists]);

  if (isCartDataExists) {
    content = (
      <div>
        <Header />
        <main className="container content my-5">
          <p className="my-4 px-4 lg:px-0">
            <Link
              className="text-bgprimary underline underline-offset-2"
              to="/"
            >
              Home
            </Link>{" "}
            / <span className="text-muted-foreground">Checkout</span>
          </p>
          <div className="flex flex-col-reverse lg:grid px-4 lg:px-0 lg:grid-cols-2 gap-3 lg:h-screen">
            {/* Checkout Form */}
            <div>
              {stage === 1 && <ContactInformation setStage={setStage} />}
              {stage === 2 && <Shipment setStage={setStage} />}
              {stage === 3 && (
                <PaymentSelect setStage={setStage} cart_items={items} />
              )}
            </div>
            {/* Checkout Summary */}
            {/* {!isResponsive && ( */}
              <div className="border-l-[1px] border-slate-500/30 bg-neutral-100/20 px-3">
                <Summary items={items} />
              </div>
            {/* )} */}
          </div>
        </main>
      </div>
    );
  } else {
    content = null;
  }
  return <React.Fragment>{content}</React.Fragment>;
}

export default Checkout;
