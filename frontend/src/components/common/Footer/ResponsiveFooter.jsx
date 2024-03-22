import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import NewsLetter from "./NewsLetter";
import { footermenulist } from "@/data/menulist";

function ResponsiveFooter() {
  return (
    <div className="w-full p-2 flex flex-col gap-3 justify-center items-center">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-0">
          <AccordionTrigger className="text-whiteprimary font-normal text-base">Newsletter</AccordionTrigger>
          <AccordionContent>
            <NewsLetter />
          </AccordionContent>
        </AccordionItem>
        {footermenulist.map((fmenu, index) => (
          <AccordionItem key={fmenu.id} value={`item-${index + 1}`}>
            <AccordionTrigger className="text-whiteprimary font-normal text-base">{fmenu.title}</AccordionTrigger>
            <AccordionContent>
              <ul className="flex flex-col gap-2 text-whiteprimary font-light text-base my-3">
                {fmenu.submenu.map((submenu) => (
                  <li key={submenu.id}>
                    <a href={submenu.url}>{submenu.title}</a>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export default ResponsiveFooter;
