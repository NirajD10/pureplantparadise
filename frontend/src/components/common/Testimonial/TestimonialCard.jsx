import React from "react";

function TestimonialCard(props) {
  return (
    <div className="rounded-2xl border-[0.5px] border-[#121212] border-opacity-20 p-4">
      {props.children}
    </div>
  );
}

export default TestimonialCard;
