import { Outlet } from "react-router-dom";
import Providers from "./Providers";

export default function NoLayout() {
  return (
    <Providers>
      {/* <main className="h-screen"> */}
      <Outlet />
      {/* </main> */}
    </Providers>
  );
}
