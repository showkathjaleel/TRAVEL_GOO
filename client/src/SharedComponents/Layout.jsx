/* eslint-disable react/prop-types */
import React from "react";
import NavigationCard from "./Navigation";

export default function Layout({ children, hideNavigation, userId }) {


  let rightColumnClasses = "";
  if (hideNavigation) {
    rightColumnClasses += "w-full";
  } else {
    rightColumnClasses += "mx-4 md:mx-0 md:w-11/12";
  }
  return (
    <div className="md:flex mt-4 max-w-7xl mx-auto gap-6 mb-24 md:mb-0  bg-neutral-100">
      {!hideNavigation && (
        <div className="fixed md:static w-full bottom-0 md:w-3/12 -mb-5 ">
          <NavigationCard />
        </div>
      )}
      <div className={rightColumnClasses}>{children}</div>
    </div>
  );
}
