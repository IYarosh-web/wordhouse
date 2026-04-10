import React, { useEffect } from "react";
import { useUnit } from "effector-react";
import { DashboardPage } from "pages";
import { appInitialized } from "app/model";
import { Routes, Route, Navigate } from "react-router";
import { history, BrowserRouter } from "./router/history";
import { ViewWordModal, $activeWord } from "features/view-word";

import "effector/enable_debug_traces";
import HomePage from "pages/home";
import { WidgetsPage } from "pages/widgets";
import { MainLayout } from "./ui";
import { SettingsPage } from "pages/settings";
import { WidgetWordlePage } from "pages/wordle";
import { loadWordsFx } from "entities/word/model/store";

export const App = () => {
  const [initApp, activeWord, loading] = useUnit([appInitialized, $activeWord, loadWordsFx.pending]);

  useEffect(() => {
    initApp();
  }, [initApp]);

  if (loading) {
    return <>Loading...</>
  }

  return (
    <BrowserRouter history={history}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index path="/" element={<HomePage />} />
          <Route path="dashboard" element={<DashboardPage />}>
            <Route
              path=":word"
              element={<ViewWordModal key={activeWord?.id} />}
            />
          </Route>
          <Route path="widgets">
            <Route index element={<WidgetsPage />} />
            <Route path="wordle" element={<WidgetWordlePage />} />
          </Route>
          <Route path="settings" element={<SettingsPage />} />
          <Route path="*" Component={<Navigate path="dashboard" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
