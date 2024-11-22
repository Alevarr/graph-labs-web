"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import { Button, Input, Link } from "@nextui-org/react";

import { useForm } from "react-hook-form";

import { z } from "zod";
import PasswordInput from "./PasswordInput";
import { useEffect, useState } from "react";
import { APP_ROUTES } from "@/constant/appRoutes.constant";
import { toast } from "sonner";
import useLocalStorageUser from "@/hooks/useLocalStorageUser";
import RoleSelect from "./RoleSelect";
import { Role } from "@/schema/schema";
import { useNavigate } from "react-router-dom";

const signInSchema = z.object({
	email: z.string().email("Некорректная почта"),
	password: z.string().min(3, "Пароль должен быть не менее 3 символов"),
});

export type SignInSchemaType = z.infer<typeof signInSchema>;

export default function SignInForm() {
	const [isSubmitting, setIsSubmitting] = useState(false);

	const [user, setUser] = useLocalStorageUser();

	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			navigate(APP_ROUTES.index);
		}
	}, [user, navigate]);

	const [value, setValue] = useState<Role | null>(Role.User);

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<SignInSchemaType>({ resolver: zodResolver(signInSchema) });
	const onSubmit = (data: SignInSchemaType) => {
		setIsSubmitting(true);
		new Promise((resolve) => {
			setTimeout(() => {
				resolve(true);
			}, 2000);
		}).then(() => {
			setIsSubmitting(false);
			setUser({
				email: data.email,
				role: value ?? Role.User,
				password: data.password,
			});
			toast.success("Вы типо успешно вошли");
		});
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="grid grid-cols-1 gap-4">
				<Input
					isRequired={true}
					type="email"
					autoComplete="email"
					label="Почта"
					variant="bordered"
					isInvalid={!!errors.email?.message}
					errorMessage={errors.email?.message}
					{...register("email")}
				/>

				<PasswordInput
					isRequired={true}
					autoComplete="current-password"
					label="Пароль"
					variant="bordered"
					isInvalid={!!errors.password?.message}
					errorMessage={errors.password?.message}
					{...register("password")}
				/>

				<RoleSelect value={value} setValue={setValue} />

				<Button
					id="BTN_sign_in"
					type="submit"
					color="primary"
					isLoading={isSubmitting}
				>
					Войти
				</Button>

				<Link
					id="LINK_sign_up_from_sign_in"
					size="sm"
					href={APP_ROUTES.authentication.signUp}
					className="justify-self-center"
				>
					Нет аккаунта? Зарегистрироваться
				</Link>
			</div>
		</form>
	);
}
