import AutomatаNavCardsList from "@/features/admin/AutomatаNavCardsList";
import GraphNavCardsList from "@/features/admin/GraphNavCardsList";
import { Tab, Tabs } from "@nextui-org/react";

const AdminPage = () => {
	return (
		<Tabs
			aria-label="Options"
			classNames={{
				base: "mx-auto block w-[280px]",
				panel: "py-4",
			}}
			color="primary"
		>
			<Tab key="graph" title="Теория графов">
				<GraphNavCardsList />
			</Tab>
			<Tab key="automatа" title="Теория автоматов">
				<AutomatаNavCardsList />
			</Tab>
		</Tabs>
	);
};

export default AdminPage;
