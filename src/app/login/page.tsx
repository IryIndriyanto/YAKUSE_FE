import LoginForm from "./LoginForm";
import Image from "next/image";

const LoginPage = () => {
  return (
    <main className="h-[100vh] flex items-center justify-center">
      <div className="flex items-center justify-center gap-16">
        <LoginForm className="basis-1/2" />
        <Image
          src={"/assets/images/two-business-man.png"}
          width={700}
          height={700}
          alt="two businessman talking"
          className="mq825:hidden block basis-1/2"
        />
      </div>
    </main>
  );
};

export default LoginPage;
