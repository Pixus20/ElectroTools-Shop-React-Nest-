'use client'
import MainNavbar from "./MainNavbar";

function Header()  {
   return (
     <div className=" w-full  bg-amber-300  ">
      <div className="max-w-[1280px] mx-auto flex justify-between">
            <MainNavbar/>
      </div>
      
     </div>
   );
}
export default Header