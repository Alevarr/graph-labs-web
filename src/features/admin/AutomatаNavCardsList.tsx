import { Wrench } from "lucide-react";
import CardsWrapper from "./CardsWrapper";
import SectionCard from "./SectionCard";

const AutomatаNavCardsList = () => {
	const singleItem = {
		title: "В разработке",
		IconComponent: Wrench,
		href: "#",
	};
	return (
		<CardsWrapper>
			<SectionCard item={singleItem} />
		</CardsWrapper>
	);
};

export default AutomatаNavCardsList;
