import { rest } from "msw";

type Credentials = {
  email: string;
  password: string;
};

const checkCrdentials = ({ email, password }: Credentials) =>
  email === "test@gmail.com" && password === "password";

const verifyCode = ({ tfa }: { tfa: string }) => tfa === "tfa";

const handlers = [
  rest.post(
    "https://gateway.lizhi.io/demo/login.php",
    async (req, res, ctx) => {
      const matched = checkCrdentials(await req.json());
      if (!matched) {
        return res(
          ctx.json({
            status: 1,
            message: "密码错误或邮箱与对应的密码不相符!",
          })
        );
      }
      return res(
        ctx.json({
          status: 0,
          token: "token",
        })
      );
    }
  ),
  rest.post(
    "https://gateway.lizhi.io/demo/verifyCode.php",
    async (req, res, ctx) => {
      const verified = verifyCode(await req.json());

      if (!verified) {
        return res(
          ctx.json({
            status: 1,
            message: "验证码已过期或错误!",
          })
        );
      }
      return res(
        ctx.json({
          status: 0,
        })
      );
    }
  ),
];

export { handlers };
