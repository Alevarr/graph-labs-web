import { Role } from "@/schema/schema";

export type User = {
  email: string;
  password: string;
  role: Role;
};
