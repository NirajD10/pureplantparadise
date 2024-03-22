import React from "react";
import { footermenulist } from "@/data/menulist";
import NewsLetter from "./NewsLetter";
import { useMediaQuery } from "@uidotdev/usehooks";
import ResponsiveFooter from "./ResponsiveFooter";

function Footer() {
  const isResponsive = useMediaQuery("only screen and (max-width: 992px)");
  return (
    <React.Fragment>
      <div className="w-full md:h-96 flex bg-bgprimary ">
        {isResponsive ? (
          <ResponsiveFooter />
        ) : (
          <div className="container grid grid-cols-4 gap-4 place-content-center">
            <NewsLetter />
            {footermenulist.map((fmenu) => (
              <div key={fmenu.id} className="text-center py-2">
                <h5 className="text-lg font-bold text-whiteprimary">
                  {fmenu.title}
                </h5>
                <ul className="flex flex-col gap-5 text-whiteprimary font-light text-lg mt-5">
                  {fmenu.submenu.map((submenu) => (
                    <li key={submenu.id}>
                      <a href={submenu.url}>{submenu.title}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
      <p className="bg-bgprimary text-base text-whiteprimary font-light text-center py-5 -translate-y-0.5 sm:-translate-y-0">
        Website designed & developed by Niraj Deshmukh <br />
        <span className="text-whiteprimary font-light text-center my-2">
          Technologies used React.js, Node.js, Express.js, MongoDB
        </span>
      </p>
    </React.Fragment>
  );
}

export default Footer;
