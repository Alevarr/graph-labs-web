import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/layout/Layout";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import { APP_ROUTES } from "./constant/appRoutes.constant";
import BinaryOperationsPage from "./pages/BinaryOperationsPage";
import ShortestWayPage from "./pages/ShortestWayPage";
import SignInPage from "./pages/SignInPage";
import AuthLayout from "./pages/layout/AuthLayout";
import SignUpPage from "./pages/SignUpPage";
import AdminPage from "./pages/AdminPage";
import CreateTaskPage from "./pages/CreateTaskPage";
import TasksCatalogPage from "./pages/TasksCatalogPage";
import CompletionResultsPage from "./pages/CompletionResultsPage";
import TrainingTasksPage from "./pages/TrainingTasksPage";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		errorElement: <ErrorPage />,
		children: [
			{ index: true, element: <HomePage /> },
			{
				path: APP_ROUTES.binaryOperations.index,
				element: <BinaryOperationsPage />,
			},
			{ path: APP_ROUTES.shortestWay.index, element: <ShortestWayPage /> },
			{
				path: APP_ROUTES.admin.index,
				children: [
					{ index: true, element: <AdminPage /> },
					{ path: APP_ROUTES.admin.createTask, element: <CreateTaskPage /> },
					{
						path: APP_ROUTES.admin.tasksCatalog,
						element: <TasksCatalogPage />,
					},
					{
						path: APP_ROUTES.admin.completionResults,
						element: <CompletionResultsPage />,
					},
					{
						path: APP_ROUTES.admin.trainingTasks,
						element: <TrainingTasksPage />,
					},
				],
			},
		],
	},
	{
		path: "/",
		element: <AuthLayout />,
		errorElement: <ErrorPage />,
		children: [
			{ path: APP_ROUTES.authentication.signIn, element: <SignInPage /> },
			{ path: APP_ROUTES.authentication.signUp, element: <SignUpPage /> },
		],
	},
]);

export default router;
