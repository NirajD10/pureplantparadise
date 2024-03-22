import React from "react";
import { Star } from "@phosphor-icons/react";

function ReviewsStar() {
  return (
    <div className="flex flex-row my-4 items-center">
      <Star size={18} color="#ffa41c" weight="thin" />
      <Star size={18} color="#ffa41c" weight="thin" />
      <Star size={18} color="#ffa41c" weight="thin" />
      <Star size={18} color="#ffa41c" weight="thin" />
      <Star size={18} color="#ffa41c" weight="thin" />
      <p className="font-light ml-2">(0)</p>
    </div>
  );
}

export default ReviewsStar;
