/* eslint-disable react/prop-types */
import React from "react";
import NavigationCard from "./Navigation";

export default function Layout({ children, hideNavigation }) {
  //   let rightColumnClasses = 'mx-4 md:mx-0 md:w-9/12'

  // return (
  //   <div className="md:flex mt-4 max-w-6xl mx-56 gap-6 mb-24 md:mb-0">

  //       <div className="fixed md:static w-full bottom-0 md:w-3/12 -mb-5">
  //         <NavigationCard />
  //       </div>
  //     <div className={rightColumnClasses}>
  //       {children}
  //     </div>
  //   </div>
  // );
  // }

  let rightColumnClasses = "";
  if (hideNavigation) {
    rightColumnClasses += "w-full";
  } else {
    rightColumnClasses += "mx-4 md:mx-0 md:w-9/12";
  }
  return (
    <div className="md:flex mt-4 max-w-6xl mx-auto gap-6 mb-24 md:mb-0">
      {!hideNavigation && (
        <div className="fixed md:static w-full bottom-0 md:w-3/12 -mb-5">
          <NavigationCard />
        </div>
      )}
      <div className={rightColumnClasses}>{children}</div>
    </div>
  );
}
