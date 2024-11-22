import { Role } from "@/schema/schema";
import { Select, Selection, SelectItem } from "@nextui-org/react";
import { Dispatch, SetStateAction } from "react";

const roles = [
  { key: Role.User, label: "Пользователь" },
  { key: Role.Admin, label: "Админ" },
  { key: Role.Moderator, label: "Модератор" },
];
const RoleSelect = ({
  value,
  setValue,
}: {
  value: Role | null;
  setValue: Dispatch<SetStateAction<Role | null>>;
}) => {
  return (
    <Select
      label="Роль"
      variant="bordered"
      selectedKeys={value ? [`${value}`] : undefined}
      onSelectionChange={(keys) => {
        // @ts-ignore
        setValue(keys.currentKey ?? null);
      }}
    >
      {roles.map((role) => (
        <SelectItem key={role.key}>{role.label}</SelectItem>
      ))}
    </Select>
  );
};

export default RoleSelect;
