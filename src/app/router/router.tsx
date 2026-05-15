import { createHashRouter, Navigate } from "react-router";

import { MainLayout } from "app/ui";
import { Home, Dashboard, Widgets, Settings } from "pages";
import { EditWord } from "features/edit-word";
import { AddWord } from "features/add-word";
import { WidgetWordle } from "pages/wordle";
import { Protected } from "./protected";
import { Login } from "pages/login";

export const router = createHashRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                path: "/",
                element: <Home />,
            },
            {
                path: "dashboard",
                element: <Protected><Dashboard /></Protected>,
                children: [
                    {
                        path: ":word",
                        element: <EditWord />
                    },
                    {
                        path: "add-word",
                        element: <AddWord />
                    }
                ]
            },
            {
                path: "widgets",
                element: <Protected />,
                children: [
                    {
                        index: true,
                        element: <Widgets />
                    },
                    {
                        path: "wordle",
                        element: <WidgetWordle />
                    }
                ],
            },
            {
                path: "settings",
                element: <Protected><Settings /></Protected>
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "*",
                element: <Navigate to="dashboard" />
            },
        ]
    },
], { basename: "/wordhouse" });