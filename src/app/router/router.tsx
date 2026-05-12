import { createBrowserRouter, Navigate } from "react-router";

import { MainLayout } from "app/ui";
import HomePage from "pages/home";
import { DashboardPage } from "pages/index";
import { ViewWordModal } from "features/view-word";
import { AddWordModal } from "features/add-word";
import { WidgetsPage } from "pages/widgets";
import { WidgetWordlePage } from "pages/wordle";
import { SettingsPage } from "pages/settings";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                path: "/",
                element: <HomePage />
            },
            {
                path: "dashboard",
                element: <DashboardPage />,
                children: [
                    {
                        path: ":word",
                        element: <ViewWordModal />
                    },
                    {
                        path: "add-word",
                        element: <AddWordModal />
                    }
                ]
            },
            {
                path: "widgets",
                children: [
                    {
                        index: true,
                        element: <WidgetsPage />
                    },
                    {
                        path: "wordle",
                        element: <WidgetWordlePage />
                    }
                ],
            },
            {
                path: "settings",
                element: <SettingsPage />
            },
            {
                path: "*",
                element: <Navigate to="dashboard" />
            }
        ]
    },
], { basename: "/wordhouse" });