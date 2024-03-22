import React from "react";
import FeatureCard from "@/components/common/Features/FeatureCard";
import { featurelists } from "@/data/datalist";

function Features() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 md:gap-2 lg:gap-4">
      {featurelists.map((feature) => (
        <FeatureCard key={feature.id}>
          <div className="p-3 w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] rounded-2xl bg-bgsecondary bg-opacity-25 group-hover:bg-whiteprimary mb-4">
            <img src={feature.imgsrc} alt={feature.title} />
          </div>
          <h4 className="font-bold text-base sm:text-lg my-2">{feature.title}</h4>
          <p className="font-light text-base break-words">
            {feature.description}
          </p>
        </FeatureCard>
      ))}
    </div>
  );
}

export default Features;
