import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { TbXboxXFilled } from "react-icons/tb";
import Cookies from 'js-cookie'

const Navbar = () => {
  const [clickedHamb, setClickedHamb] = useState(false);
  const navigate = useNavigate();
  return (
    <div>
      {/*navbar mobile  */}
      <ul className="flex items-center justify-between px-5  md:px-15 h-[64px] md:h-[96px] bg-[#F8FAFC] ">
        <li className="flex items-center gap-2">
          <img
            src="https://res.cloudinary.com/distnojxb/image/upload/v1771823772/Frame_274_jivpm6.png"
            className="h-[32px] w-[39px] md:w-[53px] md:h-[43px]"
          />
          <h1 className="font-[700] text-[#F7931E] text-[16px] md:text-[24px] leading-[24px] tracking-normal italic">
            Tasty Kitchens
          </h1>
        </li>
        <li>
          <GiHamburgerMenu
            className="text-xl text-[#183B56] font-bold md:hidden"
            onClick={() => setClickedHamb(true)}
          />
        </li>

        <ul className="gap-5 hidden md:flex">
          <li>
            <Link to="/">
              <h1 className="h-[16px] font-[700] text-[#334155] leading-[26px] pt-[8px] tracking-[-0.36px]">
                Home
              </h1>
            </Link>
          </li>
          <li>
            <Link to="/cart">
              <h1 className="h-[16px] font-[700] text-[#334155] leading-[26px] pt-[8px] tracking-[-0.36px]">
                Cart
              </h1>
            </Link>
          </li>
          <li>
            <button
              className="rounded-[8px] py-[8px] font-[500] text-[12px] tracking-normal leading-[16px]  mt-[4px] px-[16px] text-[#FFFFFF] bg-[#F7931E]"
              onClick={() => {
                Cookies.remove("jwt_token");
                navigate("/login");
              }}
            >
              Logout
            </button>
          </li>
        </ul>
      </ul>

      {clickedHamb && (
        <div
          className={`flex items-center py-3 justify-between px-5 
            transform transition-all duration-300 ease-in-out
         ${clickedHamb ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5 pointer-events-none"}`}
        >
          <ul className="flex gap-5">
            <li>
              <Link to="/">
                <h1 className="h-[16px] font-[500] text-[#334155] leading-[26px] pt-[8px] tracking-[-0.36px]">
                  Home
                </h1>
              </Link>
            </li>
            <li>
              <Link to="/cart">
                <h1 className="h-[16px] font-[500] text-[#334155] leading-[26px] pt-[8px] tracking-[-0.36px]">
                  Cart
                </h1>
              </Link>
            </li>
            <li>
              <button
                className="rounded-[8px] py-[8px] font-[500] text-[12px] tracking-normal leading-[16px]  mt-[4px] px-[16px] text-[#FFFFFF] bg-[#F7931E]"
                onClick={() => {
                  Cookies.remove("jwt_token");
                  navigate("/login");
                }}
              >
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
