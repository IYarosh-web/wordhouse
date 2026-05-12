import { createBrowserRouter, Navigate } from "react-router";

import { MainLayout } from "app/ui";
import Home from "pages/home";
import { Dashboard } from "pages/index";
import { EditWord } from "features/edit-word";
import { AddWord } from "features/add-word";
import { Widgets } from "pages/widgets";
import { WidgetWordle } from "pages/wordle";
import { Settings } from "pages/settings";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                path: "/",
                element: <Home />
            },
            {
                path: "dashboard",
                element: <Dashboard />,
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
                element: <Settings />
            },
            {
                path: "*",
                element: <Navigate to="dashboard" />
            }
        ]
    },
], { basename: "/wordhouse" });