import NavBar from "@/components/layout/NavBar/NavBar";

import { isRouteErrorResponse, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <>
      <NavBar />
      <div className="w-full h-screen flex items-center justify-center bg-almost-white">
        <h1 className="text-5xl">
          {isRouteErrorResponse(error)
            ? "Wrong url bro"
            : "Something went wrong..."}
        </h1>
      </div>
    </>
  );
};

export default ErrorPage;
