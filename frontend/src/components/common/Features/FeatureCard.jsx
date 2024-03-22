import React from "react";

function FeatureCard(props) {
  return (
    <div
      className="group w-auto h-64 md:h-80 lg:h-64 p-6 rounded-3xl !border-[0.5px] border-[#121212] !border-opacity-10 hover:bg-bgprimary hover:text-whiteprimary hover:transition-all"
      {...props}
    >
      {props.children}
    </div>
  );
}

export default FeatureCard;
