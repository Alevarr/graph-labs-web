import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	Link,
	Button,
	Dropdown,
	DropdownTrigger,
	Avatar,
	DropdownMenu,
	DropdownItem,
	NavbarMenuToggle,
	NavbarMenuItem,
	NavbarMenu,
} from "@nextui-org/react";
import LogoIcon from "../../icons/LogoIcon";
import { APP_ROUTES } from "@/constant/appRoutes.constant";
import { useLocation } from "react-router-dom";
import navItems from "./navItems.constant";
import useLocalStorageUser from "@/hooks/useLocalStorageUser";
import { LogOut } from "lucide-react";
import { useState } from "react";

const NavBar = () => {
	const { pathname } = useLocation();
	const [user, setUser] = useLocalStorageUser();

	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<Navbar className="bg-almost-white" isBlurred>
			<NavbarContent className="sm:hidden" justify="start">
				<NavbarMenuToggle
					aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
				/>
			</NavbarContent>
			<NavbarBrand>
				<Link href={APP_ROUTES.index}>
					<LogoIcon />
					<p className="font-bold text-inherit ml-2 text-primary-500">
						GraphLabs
					</p>
				</Link>
			</NavbarBrand>
			<NavbarContent className="hidden sm:flex gap-4" justify="center">
				{navItems.map((item) => (
					<NavbarItem key={item.title} isActive={pathname === item.href}>
						<Link
							color={pathname === item.href ? "primary" : "foreground"}
							href={item.href}
						>
							{item.title}
						</Link>
					</NavbarItem>
				))}
			</NavbarContent>
			<NavbarContent justify="end">
				{!user ? (
					<>
						<NavbarItem>
							<Link href={APP_ROUTES.authentication.signIn}>Войти</Link>
						</NavbarItem>
						<NavbarItem>
							<Button
								as={Link}
								color="primary"
								href={APP_ROUTES.authentication.signUp}
								variant="flat"
								className="hidden lg:flex"
							>
								Зарегистрироваться
							</Button>
						</NavbarItem>
					</>
				) : (
					<Dropdown placement="bottom-end">
						<DropdownTrigger>
							<Avatar
								isBordered
								as="button"
								className="transition-transform"
								color="secondary"
								size="sm"
							/>
						</DropdownTrigger>
						<DropdownMenu aria-label="Profile Actions" variant="flat">
							<DropdownItem key="profile" className="gap-2">
								<p className="font-semibold">{user?.email}</p>
							</DropdownItem>
							<DropdownItem key="settings">
								<Link color="foreground" href={APP_ROUTES.admin.index}>
									Панель управления
								</Link>
							</DropdownItem>
							<DropdownItem
								key="logout"
								color="danger"
								className="text-danger"
								onClick={() => setUser(null)}
								startContent={<LogOut />}
							>
								Выйти
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				)}
			</NavbarContent>
			<NavbarMenu>
				{navItems.map((item) => (
					<NavbarMenuItem key={item.title} isActive={pathname === item.href}>
						<Link
							color={pathname === item.href ? "primary" : "foreground"}
							href={item.href}
						>
							{item.title}
						</Link>
					</NavbarMenuItem>
				))}
			</NavbarMenu>
		</Navbar>
	);
};

export default NavBar;
