import AuthFormHeader from "@/components/auth/AuthFormHeader";
import SignUpForm from "@/components/auth/SignUpForm";
import Title from "@/components/common/Title";
import LogoIcon from "@/components/icons/LogoIcon";
import { APP_ROUTES } from "@/constant/appRoutes.constant";

export default function SignUpPage() {
  return (
    <div className="flex flex-col gap-4">
      <AuthFormHeader backLink={APP_ROUTES.index} />

      <div className="flex flex-col items-center gap-2">
        <LogoIcon />
        <Title className="text-center">Регистрация</Title>
      </div>
      <SignUpForm />
    </div>
  );
}
