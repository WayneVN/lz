import { useForm } from "react-hook-form";

import Loading from "../../components/loading";
import { useVerifyCodeMutation } from "../api";
import avatarImg from "../../assets/tx.png";
import phoneAvatarImg from "../../assets/tx@2x.png";
import passwordImg from "../../assets/password.png";
import phonePasswordImg from "../../assets/password@2x.png";

type Input = {
  tfa: string;
};

export default function CodeVerificationForm() {
  const [verifyCode, { isLoading }] = useVerifyCodeMutation();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Input>({
    mode: "onChange",
  });
  const onSubmit = (data: Input) => {
    verifyCode(data)
      .unwrap()
      .then(({ status }) => {
        if (status === 0) {
          window.location.href = "https://www.lizhi.io";
        }
      });
  };
  return (
    <form
      className="space-y-5 mobile:space-y-7 mobile:pt-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex items-center justify-center mt-1 ">
        <img className="hidden desktop:inline" src={avatarImg} alt="Avatar" />
        <img
          className="hidden mobile:inline"
          src={phoneAvatarImg}
          alt="Avatar"
        />
      </div>
      <div className="relative flex w-full flex-wrap items-stretch mb-3">
        <span className="z-10 h-full leading-snug font-normal absolute text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 mobile:w-24 pt-2 mobile:pt-6 pl-4">
          <img className="hidden desktop:inline" src={passwordImg} alt="Code" />
          <img
            className="hidden mobile:inline"
            src={phonePasswordImg}
            alt="Code"
          />
        </span>
        <input
          aria-label="tfa"
          {...register("tfa", { required: true })}
          placeholder="请输入你的两步验证码"
          className={
            errors.tfa
              ? "py-[9px] mobile:py-[22px] placeholder-[#B1B3B8] text-[#3B3C3D] bg-white rounded-md text-[16px] mobile:text-[32px] leading-[22px] border border-[#FA5757] outline-none focus:outline-none focus:border-[#3371FF] w-full pl-12 mobile:pl-[136px]"
              : "py-[9px] mobile:py-[22px] placeholder-[#B1B3B8] text-[#3B3C3D] bg-white rounded-md text-[16px] mobile:text-[32px] leading-[22px] border border-[#D0D3D6] outline-none focus:outline-none focus:border-[#3371FF] w-full pl-12 mobile:pl-[136px]"
          }
        />
        <p className="text-[#FA5757] mobile:text-[24px] mobile:leading-[33px]">
          {errors.tfa?.message}
        </p>
      </div>
      <div>
        <button
          type="submit"
          disabled={!isValid}
          className="flex w-full justify-center rounded-md border border-transparent bg-[#3371FF] disabled:bg-[#BBBFC4] py-[9px] mobile:py-[19px] px-4 text-[16px] mobile:text-[36px] leading-[22px] mobile:leading-[50px] font-normal text-white"
        >
          {isLoading && <Loading />}
          确定
        </button>
      </div>
    </form>
  );
}
