import { FaInstagram, FaFacebookSquare, FaPinterest, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="min-h-[256px] md:min-h-[424px] py-10 bg-[#0F172A] flex flex-col items-center justify-center gap-5">
      
      {/* 🔹 Logo + Brand */}
      <div className="flex items-center gap-3">
        <img
          src="https://res.cloudinary.com/distnojxb/image/upload/v1771886725/Group_7420_nm0kn6.png"
          className="h-[32px] md:h-[38.86px] w-[40px] md:w-[48.73px]"
          alt="logo"
        />
        <h1 className="font-[700] text-[20px] md:text-[32px] text-white italic leading-[24px] md:leading-[48px]">
          Tasty Kitchens
        </h1>
      </div>

      {/* 🔹 Tagline */}
      <div className="flex flex-col gap-1 justify-center items-center text-center px-4">
        <p className="text-[14px] md:text-[24px] text-white font-[400] leading-[24px] md:leading-[32px]">
          The only thing we are serious about is food.
        </p>
        <p className="text-[14px] md:text-[24px] text-white font-[400] leading-[24px] md:leading-[32px]">
          Contact us on
        </p>
      </div>

      {/* 🔹 Social Icons */}
      <ul className="flex items-center gap-5">
        
        <li className="p-2 cursor-pointer hover:opacity-70 transition">
          <FaPinterest className="h-[24px] md:h-[40px] w-[24px] md:w-[40px] text-white" />
        </li>

        <li className="p-2 cursor-pointer hover:opacity-70 transition">
          <FaInstagram className="h-[24px] md:h-[40px] w-[24px] md:w-[40px] text-white" />
        </li>

        <li className="p-2 cursor-pointer hover:opacity-70 transition">
          <FaTwitter className="h-[24px] md:h-[40px] w-[24px] md:w-[40px] text-white" />
        </li>

        <li className="p-2 cursor-pointer hover:opacity-70 transition">
          <FaFacebookSquare className="h-[24px] md:h-[40px] w-[24px] md:w-[40px] text-white" />
        </li>

      </ul>

    </div>
  );
};

export default Footer;