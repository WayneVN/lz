import * as yup from "yup";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { useLoginMutation } from "../api";
import Loading from "../../components/loading";
import emailImg from "../../assets/email.png";
import passwordImg from "../../assets/password.png";
import phoneEmailImg from "../../assets/email@2x.png";
import phonePasswordImg from "../../assets/password@2x.png";

type Input = {
  email: string;
  password: string;
};

const schema = yup
  .object({
    email: yup
      .string()
      .email("邮箱格式错误，请重新输入!")
      .required("邮箱不能为空!"),
    password: yup
      .string()
      .min(8, "密码长度8～32位!")
      .max(32)
      .required("密码不能为空!"),
  })
  .required();

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Input>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [login, { isLoading }] = useLoginMutation();
  const onSubmit = (data: Input) => {
    login(data)
      .unwrap()
      .then(({ status, message }) => {
        if (status === 1 && message) {
          setErrorMessage(message);
        }
      });
  };
  const clearErrorMessage = () => setErrorMessage("");
  return (
    <form
      className="space-y-5 mobile:space-y-7"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="relative flex w-full flex-wrap items-stretch ">
        <span className="z-10 h-full leading-snug font-normal absolute text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 mobile:w-24 pt-2 mobile:pt-6 pl-4">
          <img className="hidden desktop:inline" src={emailImg} alt="Email" />
          <img
            className="hidden mobile:inline"
            src={phoneEmailImg}
            alt="Email"
          />
        </span>
        <input
          id="email"
          aria-label="email"
          {...register("email")}
          placeholder="请输入邮箱地址"
          onFocus={clearErrorMessage}
          className={
            errors.email
              ? "py-[9px] mobile:py-[22px] placeholder-[#B1B3B8] text-[#3B3C3D] bg-white rounded-md text-[16px] mobile:text-[32px] leading-[22px] border border-[#FA5757] outline-none focus:outline-none focus:border-[#3371FF] w-full pl-12 mobile:pl-[136px]"
              : "py-[9px] mobile:py-[22px] placeholder-[#B1B3B8] text-[#3B3C3D] bg-white rounded-md text-[16px] mobile:text-[32px] leading-[22px] border border-[#D0D3D6] outline-none focus:outline-none focus:border-[#3371FF] w-full pl-12 mobile:pl-[136px]"
          }
        />
        <p className="text-[#FA5757] mobile:text-[24px] mobile:leading-[33px]">
          {errors.email?.message}
        </p>
      </div>
      <div className="relative flex w-full flex-wrap items-stretch mb-3">
        <span className="z-10 h-full leading-snug font-normal absolute text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 mobile:w-24 pt-2 mobile:pt-6 pl-4">
          <img
            className="hidden desktop:inline"
            src={passwordImg}
            alt="Password"
          />
          <img
            className="hidden mobile:inline"
            src={phonePasswordImg}
            alt="Password"
          />
        </span>
        <input
          id="password"
          type="password"
          aria-label="password"
          placeholder="请输入密码"
          {...register("password")}
          className={
            errors.password
              ? "py-[9px] mobile:py-[22px] placeholder-[#B1B3B8] text-[#3B3C3D] bg-white rounded-md text-[16px] mobile:text-[32px] leading-[22px] border border-[#FA5757] outline-none focus:outline-none focus:border-[#3371FF] w-full pl-12 mobile:pl-[136px]"
              : "py-[9px] mobile:py-[22px] placeholder-[#B1B3B8] text-[#3B3C3D] bg-white rounded-md text-[16px] mobile:text-[32px] leading-[22px] border border-[#D0D3D6] outline-none focus:outline-none focus:border-[#3371FF] w-full pl-12 mobile:pl-[136px]"
          }
        />
        <p className="text-[#FA5757] mobile:text-[24px] mobile:leading-[33px]">
          {errors.password?.message}
        </p>
      </div>
      <button
        type="submit"
        disabled={!isValid}
        className="flex w-full justify-center rounded-md border border-transparent bg-[#3371FF] disabled:bg-[#BBBFC4] py-[9px] mobile:py-[19px] px-4 text-[16px] mobile:text-[36px] leading-[22px] mobile:leading-[50px] font-normal text-white"
      >
        {isLoading && <Loading />}
        下一步
      </button>
      <div className="flex items-center justify-center relative">
        <span className="absolute top-1 mobile:top-16 text-sm mobile:text-[26px] empty:bg-transparent empty:shadow-none mobile:leading-[37px] mobile:shadow-2xl font-normal tracking-normal text-center text-[#FC6161] mobile:text-white mobile:bg-[#FC6161] mobile:rounded-lg mobile:px-5 mobile:py-[14px]">
          {errorMessage}
        </span>
      </div>
    </form>
  );
}
