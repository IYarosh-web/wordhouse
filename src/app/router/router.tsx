import { createBrowserRouter, Navigate } from "react-router";

import { MainLayout } from "app/ui";
import { Home, Dashboard, Widgets, Settings } from "pages";
import { EditWord } from "features/edit-word";
import { AddWord } from "features/add-word";
import { WidgetWordle } from "pages/wordle";
import { Protected } from "./protected";
import { Login } from "pages/login";
import { SentenceFillWidget } from "pages/sentence-fill";

export const router = createBrowserRouter([
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
                    },
                    {
                        path: "sentence-fill",
                        element: <SentenceFillWidget />
                    }
                ],
            },
            {
                path: "settings",
                element: <Protected />,
                children: [
                    {
                        index: true,
                        element: <Settings />
                    }
                ]
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "*",
                element: <Navigate to="/dashboard" />
            },
        ]
    },
]);