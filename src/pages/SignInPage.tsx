import AuthFormHeader from "@/components/auth/AuthFormHeader";
import SignInForm from "@/components/auth/SignInForm";
import Title from "@/components/common/Title";
import LogoIcon from "@/components/icons/LogoIcon";
import { APP_ROUTES } from "@/constant/appRoutes.constant";

export default function SignInPage() {
  return (
    <div className="flex flex-col gap-4">
      <AuthFormHeader backLink={APP_ROUTES.index} />

      <div className="flex flex-col items-center gap-2">
        <LogoIcon />
        <Title className="text-center">Вход</Title>
      </div>
      <SignInForm />
    </div>
  );
}
