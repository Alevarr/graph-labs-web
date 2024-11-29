"use client";

import type {ButtonProps, LinkProps} from "@nextui-org/react";

import {Button, Link} from "@nextui-org/react";
import {startsWith} from "lodash";

export type ButtonWithBorderGradientProps = ButtonProps &
  LinkProps & {
    background?: string;
  };

export const ButtonWithBorderGradient = ({
  children,
  background = "--nextui-background",
  style: styleProp,
  ...props
}: ButtonWithBorderGradientProps) => {
  const linearGradientBg = startsWith(background, "--") ? `hsl(var(${background}))` : background;

  const style = {
    border: "solid 2px transparent",
    backgroundImage: `linear-gradient(${linearGradientBg}, ${linearGradientBg}), linear-gradient(to right, #f2b85c, #f2b85c)`,
    backgroundOrigin: "border-box",
    backgroundClip: "padding-box, border-box",
  };

  return (
    <Button
      as={Link}
      href="#"
      fullWidth
      {...props}
      style={{
        ...style,
        ...styleProp,
      }}
      type="submit"
    >
      {children}
    </Button>
  );
};
