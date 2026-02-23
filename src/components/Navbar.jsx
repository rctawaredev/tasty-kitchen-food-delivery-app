import { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { TbXboxXFilled } from "react-icons/tb";
const Navbar = () => {
  const [clickedHamb, setClickedHamb] = useState(false);
  return (
    <div>
      <ul className="flex items-center justify-between px-5 h-[64px] bg-[#F8FAFC] ">
        <li className="flex items-center gap-2">
          <img
            src="https://res.cloudinary.com/distnojxb/image/upload/v1771823772/Frame_274_jivpm6.png"
            className="h-[32px] w-[39px]"
          />
          <h1 className="font-[700] text-[#F7931E] text-[16px] leading-[24px] tracking-normal italic">
            Tasty Kitchens
          </h1>
        </li>
        <li>
          <GiHamburgerMenu
            className="text-xl text-[#183B56] font-bold"
            onClick={() => setClickedHamb(true)}
          />
        </li>
      </ul>
      {clickedHamb && (
        <div
          className={`flex items-center py-3 justify-between px-5 
  transform transition-all duration-300 ease-in-out
  ${clickedHamb ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5 pointer-events-none"}`}
        >
          <ul className="flex gap-5">
            <li>
              <h1 className="h-[16px] font-[500] text-[#334155] leading-[26px] pt-[8px] tracking-[-0.36px]">
                Home
              </h1>
            </li>
            <li>
              <h1 className="h-[16px] font-[500] text-[#334155] leading-[26px] pt-[8px] tracking-[-0.36px]">
                Cart
              </h1>
            </li>
            <li>
              <button className="rounded-[8px] py-[8px] font-[500] text-[12px] tracking-normal leading-[16px]  mt-[4px] px-[16px] text-[#FFFFFF] bg-[#F7931E]">
                Logout
              </button>
            </li>
          </ul>
          <TbXboxXFilled
            className="text-xl text-[#334155]"
            onClick={() => setClickedHamb(false)}
          />
        </div>
      )}
    </div>
  );
};

export default Navbar;
