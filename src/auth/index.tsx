import { useSelector } from "react-redux";

import LoginForm from "./form/login";
import { selectToken } from "./slice";
import pcBannerImg from "../assets/banner.png";
import phoneBannerImg from "../assets/banner@2x.png";
import CodeVerificationForm from "./form/code-verification";

export default function Auth() {
  const token = useSelector(selectToken);
  return (
    <div className="h-screen bg-[#F7F8FA] flex justify-end mobile:flex-col-reverse pr-[108px] mobile:pr-0">
      <div>
        <img className="hidden desktop:inline" src={pcBannerImg} alt="Banner" />
        <img
          className="hidden mobile:inline"
          src={phoneBannerImg}
          alt="Banner"
        />
      </div>
      <div className="w-[400px] mobile:w-full">
        <h2 className="hidden mobile:block my-[104px] pb-[22px] text-center text-[36px] text-[#333333] font-medium tracking-normal">
          登录
        </h2>
        <div className="bg-white mt-20 mobile:mt-0 pb-6 mobile:pb-9 pt-10  mobile:pt-[60px] px-10 shadow-3xl rounded-xl leading-10 mobile:mx-[30px]">
          <h3 className="text-[#333333] text-[28px] mobile:text-5xl font-medium mb-7 mobile:mb-12">
            DIGITALYCHEE
          </h3>
          {token ? <CodeVerificationForm /> : <LoginForm />}
          <div className="mb-6 mt-[98px] mobile:mb-8 mobile:mt-[196px]">
            <div className="w-full border-t border-[#d3d3de]" />
          </div>
          <div className="text-center text-[#3371FF] text-sm mobile:text-[28px] font-normal tracking-normal">
            <a href="/">其他方式登录</a>
          </div>
        </div>
      </div>
    </div>
  );
}
