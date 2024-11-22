import BackButton from "../common/buttons/BackButton";

export default function AuthFormHeader({ backLink }: { backLink: string }) {
  return (
    <div className="flex w-full flex-row items-center justify-between gap-2">
      <BackButton href={backLink} className="w-fit " />
    </div>
  );
}
