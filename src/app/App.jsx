import { useEffect } from "react";
import { useUnit } from "effector-react";
import { RouterProvider } from "react-router";
import { router } from "app/router/router";
import { $isLoading } from "entities/word";
import { appInitialized } from "shared/contracts";

import './model/index';

import "effector/enable_debug_traces";

export const App = () => {
  const [initApp, loading] = useUnit([appInitialized, $isLoading]);

  useEffect(() => {
    initApp();
  }, [initApp]);

  if (loading) {
    return <>Loading...</>
  }

  return <RouterProvider router={router} />
};
