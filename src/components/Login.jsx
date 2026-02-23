import { useState } from "react";
import { IoEyeOutline, IoEyeOffSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showErrorMsg, setShowErrorMsg] = useState(false);

  const navigate = useNavigate();

  const onSuccessLogin = (jwtToken) => {
    Cookies.set("jwt_token", jwtToken, { expires: 30 });
    navigate("/", { replace: true });
  };

  const onFailureLogin = (msg) => {
    setErrorMsg(msg);
    setShowErrorMsg(true);
  };

  const onSignIn = async (event) => {
    event.preventDefault();
    const userDetails = { username, password };

    const response = await fetch("https://apis.ccbp.in/login", {
      method: "POST",
      body: JSON.stringify(userDetails),
    });

    const data = await response.json();

    if (response.ok) {
      onSuccessLogin(data.jwt_token);
    } else {
      onFailureLogin(data.error_msg);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center md:flex-row bg-white">
      <div className="flex justify-center items-center w-full md:w-1/2 px-6">
        <form
          onSubmit={onSignIn}
          className="bg-white flex flex-col p-6 md:p-10 md:shadow-xl rounded-lg w-full max-w-[360px] md:max-w-[400px]"
        >
          {/* desktop logo */}
          <img
            src="https://res.cloudinary.com/distnojxb/image/upload/v1771823772/Frame_274_jivpm6.png"
            className="w-10 self-center hidden md:block"
            alt="logo"
          />

          {/* mobile logo and title */}
          <div className="flex items-center gap-3 md:hidden pb-6">
            <img
              src="https://res.cloudinary.com/distnojxb/image/upload/v1771823772/Frame_274_jivpm6.png"
              className="w-10"
              alt="logo"
            />
            <h1 className="text-[24px] italic font-bold text-[#F7931E] leading-[32px]">
              Tasty Kitchen
            </h1>
          </div>

          {/* desktop title */}
          <h1 className="hidden md:block text-[24px] italic font-bold text-[#F7931E] text-center pb-6">
            Tasty Kitchen
          </h1>

          <h2 className="text-3xl text-center self-start md:self-center font-medium text-[#0F172A] pb-6">
            Login
          </h2>

          <label className="text-xs leading-[16px] tracking-[1%] font-[700] text-[#475569] pb-2">
            USERNAME
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="h-[40px] w-full px-2 text-[14px]   rounded-sm outline-none bg-[#E2E8F0] text-[#171F46]  mb-4"
          />

          <label className="text-xs leading-[16px] tracking-[1%] font-[700] text-[#475569] pb-2">
            PASSWORD
          </label>

          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="h-[40px] text-[14px] w-full rounded-sm outline-none bg-[#E2E8F0] text-[#171F46]  px-2"
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
            >
              {showPassword ? (
                <IoEyeOffSharp className="text-[#475569]" />
              ) : (
                <IoEyeOutline className="text-[#475569]" />
              )}
            </span>
          </div>

          {showErrorMsg && (
            <p className="text-red-500 text-sm pt-2">{errorMsg}</p>
          )}

          <button
            type="submit"
            className="bg-[#F7931E] w-full p-2 rounded-md mt-6 text-white"
          >
            Login
          </button>
        </form>
      </div>

      {/*  right image */}
      <div className="hidden md:block md:w-1/2">
        <img
          src="https://res.cloudinary.com/distnojxb/image/upload/v1771817606/login_t4kb51.png"
          alt="login"
          className="w-full h-screen object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
