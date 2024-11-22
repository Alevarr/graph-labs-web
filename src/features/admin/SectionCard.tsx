import { cn, Link, Ripple, useCard } from "@nextui-org/react";
import type { AdminNavItem } from "./constant/adminNavItems.constant";

const SectionCard = ({
	item: { title, IconComponent, href },
}: { item: AdminNavItem }) => {
	return (
		<>
			<CustomCard as={Link} href={href}>
				<div
					className={cn(
						"relative flex w-full flex-auto flex-col place-content-inherit align-items-inherit h-auto break-words text-left subpixel-antialiased overflow-visible p-0 justify-center items-center", //just CardBody styles
						"overflow-visible p-0 justify-center items-center",
					)}
				>
					<IconComponent className="text-primary" size={56} />
				</div>
				<div
					className={cn(
						"p-3 h-auto flex w-full items-center overflow-hidden color-inherit subpixel-antialiased rounded-b-large justify-center", //just CardFooter styles
						"justify-center",
					)}
				>
					<b className="text-primary text-lg">{title}</b>
				</div>
			</CustomCard>
		</>
	);
};

// Just to remove shadow-medium from Card, otherwise it causes ui issues with hover:scale
const CustomCard = (props: any) => {
	const { children, Component, getCardProps, getRippleProps } = useCard({
		...props,
		isPressable: true,
	});
	const { className, ...cardPropsWithoutCalssName } = getCardProps();
	return (
		<Component
			{...cardPropsWithoutCalssName}
			className={cn(
				"flex flex-col relative overflow-hidden h-auto text-foreground box-border bg-content1 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 rounded-large cursor-pointer transition-transform-background motion-reduce:transition-none data-[pressed=true]:scale-[0.97] tap-highlight-transparent", //just Card styles without shadow-medium class
				"aspect-square hover:scale-105 transition-all duration-300 bg-almost-white shadow-ambient-white w-[260px]",
			)}
		>
			{children}
			<Ripple {...getRippleProps()} />
		</Component>
	);
};

export default SectionCard;
