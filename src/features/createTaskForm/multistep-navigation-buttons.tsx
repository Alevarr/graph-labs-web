import type { ButtonProps } from "@nextui-org/react";
import type { ButtonWithBorderGradientProps } from "./button-with-border-gradient";

import * as React from "react";
import { Button, Link } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { cn } from "@nextui-org/react";

import { ButtonWithBorderGradient } from "./button-with-border-gradient";
import { APP_ROUTES } from "@/constant/appRoutes.constant";
import { House } from "lucide-react";

type MultistepNavigationButtonsProps = React.HTMLAttributes<HTMLDivElement> & {
  onBack?: () => void;
  onNext?: () => void;
  backButtonProps?: ButtonProps;
  nextButtonProps?: ButtonWithBorderGradientProps;
  isFirstPage?: boolean;
};

const MultistepNavigationButtons = React.forwardRef<
  HTMLDivElement,
  MultistepNavigationButtonsProps
>(
  (
    {
      className,
      onBack,
      onNext,
      backButtonProps,
      nextButtonProps,
      isFirstPage,
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(
        "mx-auto my-6 flex w-full items-center justify-center gap-x-4 lg:mx-0",
        className
      )}
      {...props}
    >
      {isFirstPage ? (
        <Button
          as={Link}
          href={APP_ROUTES.admin.index}
          className="rounded-medium border-default-200 text-medium font-medium text-default-500 lg:hidden shrink-0"
          variant="bordered"
          onPress={onBack}
          {...backButtonProps}
        >
          <House size={24} />
          Вернуться
        </Button>
      ) : (
        <Button
          className="rounded-medium border-default-200 text-medium font-medium text-default-500 lg:hidden shrink-0"
          variant="bordered"
          onPress={onBack}
          {...backButtonProps}
        >
          <Icon icon="solar:arrow-left-outline" width={24} />
          Назад
        </Button>
      )}

      <ButtonWithBorderGradient
        className="text-medium font-medium"
        type="submit"
        onPress={onNext}
        {...nextButtonProps}
      >
        {nextButtonProps?.children || "Далее"}
      </ButtonWithBorderGradient>
    </div>
  )
);

MultistepNavigationButtons.displayName = "MultistepNavigationButtons";

export default MultistepNavigationButtons;
