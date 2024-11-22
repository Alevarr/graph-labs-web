import { APP_ROUTES } from "@/constant/appRoutes.constant";
import {
	ChartColumnBig,
	Dumbbell,
	List,
	type LucideProps,
	Plus,
} from "lucide-react";

export type AdminNavItem = {
	title: string;
	IconComponent: React.ForwardRefExoticComponent<
		Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
	>;
	href: string;
};

const adminNavItems: AdminNavItem[] = [
	{
		title: "Создать задание",
		IconComponent: Plus,
		href: APP_ROUTES.admin.createTask,
	},
	{
		title: "Каталог заданий",
		IconComponent: List,
		href: APP_ROUTES.admin.tasksCatalog,
	},
	{
		title: "Результаты прохождения",
		IconComponent: ChartColumnBig,
		href: APP_ROUTES.admin.completionResults,
	},
	{
		title: "Тренировочные задания",
		IconComponent: Dumbbell,
		href: APP_ROUTES.admin.trainingTasks,
	},
];

export default adminNavItems;
