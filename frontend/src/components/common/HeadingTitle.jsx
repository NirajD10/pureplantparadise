import React from "react";

function HeadingTitle(props) {
  return (
    <div className="text-center mt-8 mb-5 py-5">
      <p className="text-base font-light uppercase">{props.subtitle}</p>
      <h2 className="text-3xl font-bold uppercase">{props.title}</h2>
    </div>
  );
}

export default HeadingTitle;
