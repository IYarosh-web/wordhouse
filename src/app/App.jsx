import React, { useEffect } from "react";
import { useUnit } from "effector-react";
import { DashboardPage } from "pages";
import { appInitialized } from "app/model";
import { Routes, Route } from "react-router";
import { history, BrowserRouter } from "./router/history";
import { ViewWordModal } from "widgets/view-word-modal/ui";
import { AddWordModal } from "widgets/add-word-modal/ui";
import "effector/enable_debug_traces";
import { $activeWord } from "widgets/view-word-modal/model";
import HomePage from "pages/home";
import { MainLayout } from "./ui";
import { SettingsPage } from "pages/settings";

export const App = () => {
  const [initApp, activeWord] = useUnit([appInitialized, $activeWord]);

  useEffect(() => {
    initApp();
  }, [initApp]);

  return (
    <BrowserRouter history={history}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="dashboard" element={<DashboardPage />}>
            <Route path="add-word" element={<AddWordModal />} />
            <Route
              path=":word"
              element={<ViewWordModal key={activeWord?.id} />}
            />
          </Route>
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
