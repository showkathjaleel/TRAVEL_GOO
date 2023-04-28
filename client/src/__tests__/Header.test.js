
import {render} from "@testing-library/react"

import Header from '../SharedComponents/Header'
import {StaticRouter} from "react-router-dom/server"

test("Logo should load on rendering header", () => {
   
   const header=render(
   <StaticRouter>
   < Header/>
   </StaticRouter>
   )
  
   const logo=header.getAllByTestId("logo")
   console.log(logo)
})