import { Button, Link, type ButtonProps } from "@nextui-org/react";
import { ChevronLeft } from "lucide-react";

export default function BackButton({ ...props }: ButtonProps) {
  return (
    <Button {...props} as={Link} variant="flat" startContent={<ChevronLeft />}>
      Назад
    </Button>
  );
}
