import { Outlet } from "react-router-dom";
import Providers from "./Providers";

export default function AuthLayout() {
  return (
    <Providers>
      <main className="mb-8 mt-8 flex items-center justify-center">
        <div className="flex w-full flex-col gap-4 px-4 md:w-1/2 lg:w-1/2 xl:w-1/3 2xl:w-1/4">
          <Outlet />
        </div>
      </main>
    </Providers>
  );
}
