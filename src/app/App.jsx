import { useEffect } from "react";
import { useUnit } from "effector-react";
import { appInitialized } from "app/model";
import { RouterProvider } from "react-router";
import { router } from "app/router/router";

import "effector/enable_debug_traces";
import { loadWordsFx } from "entities/word/model/store";

export const App = () => {
  const [initApp, loading] = useUnit([appInitialized, loadWordsFx.pending]);

  useEffect(() => {
    initApp();
  }, [initApp]);

  if (loading) {
    return <>Loading...</>
  }

  return <RouterProvider router={router} />
};
