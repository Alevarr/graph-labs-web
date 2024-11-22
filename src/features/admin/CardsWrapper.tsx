import type { ReactNode } from "react";

const CardsWrapper = ({ children }: { children: ReactNode }) => {
	return (
		<div className="flex w-full flex-wrap gap-4 justify-center">{children}</div>
	);
};

export default CardsWrapper;
