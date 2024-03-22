import React from "react";

import { Avatar, Card } from "keep-react";
import { testimoniallist } from "../../../data/datalist";
import HeadingTitle from "../HeadingTitle";

function Testimonial() {
  return (
    <React.Fragment>
      <HeadingTitle subtitle="Our clients" title="testimonial" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-10">
        {testimoniallist.map((tm) => (
          <Card key={tm.id} className="lg:max-w-lg max-w-none p-6 border-slate-400/40" border="true">
            <Card.Container className="flex items-center">
              <Avatar size="lg" shape="circle" img={tm.avatarurl} />
              <Card.Container className="ml-3">
                <Card.Title className="md:text-base text-sm font-semibold text-slate-800">
                  {tm.name}
                </Card.Title>
              </Card.Container>
            </Card.Container>
            <Card.Description className="line-clamp-5 text-base sm:text-lg">
              {tm.message}
            </Card.Description>
          </Card>
        ))}
      </div>
    </React.Fragment>
  );
}

export default Testimonial;
