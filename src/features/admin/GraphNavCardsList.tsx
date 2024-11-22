import CardsWrapper from "./CardsWrapper";
import adminNavItems from "./constant/adminNavItems.constant";
import SectionCard from "./SectionCard";

const GraphNavCardsList = () => {
	return (
		<CardsWrapper>
			{adminNavItems.map((item) => (
				<SectionCard key={item.title} item={item} />
			))}
		</CardsWrapper>
	);
};

export default GraphNavCardsList;
