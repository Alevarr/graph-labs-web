import { Outlet } from "react-router-dom";
import NavBar from "../../components/layout/NavBar/NavBar";
import Providers from "./Providers";

function Layout() {
	return (
		<Providers>
			<NavBar />
			{/* substract header navbar height */}
			<div className="w-full min-h-screen-without-navbar p-5 bg-almost-white">
				<Outlet />
			</div>
		</Providers>
	);
}

export default Layout;
