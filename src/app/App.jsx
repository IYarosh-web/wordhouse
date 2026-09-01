import { useEffect } from "react";
import { useUnit } from "effector-react";
import { BrowserRouter } from "react-router-dom";

import "./firebase";

import { AppRouter } from "app/router/router";
import { MainLayout } from "app/ui/main-layout";
import { wordEntity } from "entities/word";
import { appInitialized } from "shared/contracts";
import { ShortcutsProvider } from "shared/ui";

import "./model/index";

import "effector/enable_debug_traces";

export const App = () => {
  const [initApp, loading] = useUnit([appInitialized, wordEntity.$isLoading]);

  useEffect(() => {
    initApp();
  }, [initApp]);

  if (loading) {
    return <>Loading...</>;
  }

  return (
    <BrowserRouter>
      <ShortcutsProvider>
        <MainLayout>
          <AppRouter />
        </MainLayout>
      </ShortcutsProvider>
    </BrowserRouter>
  );
};
