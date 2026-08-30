import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import { Dashboard, Widgets, Settings } from "pages";
import { Login } from "pages/login";
import { WidgetWordle } from "pages/wordle";
import { SentenceCreateWidget } from "pages/sentence-create";
import { SentenceFillWidget } from "pages/sentence-fill";

import { Protected } from "./protected";

const pageVariants = {
    initial: { opacity: 0, x: "100%" },
    animate: { opacity: 1, x: 0, transition: { type: "tween", ease: "easeInOut", duration: 0.4 } },
    exit: { opacity: 0, x: "-100%", transition: { type: "tween", ease: "easeInOut", duration: 0.4 } }
  };

const PageWrapper = ({ children }: React.PropsWithChildren) => (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        boxSizing: "border-box",
        padding: "20px"
      }}
    >
      {children}
    </motion.div>
  );

export function AppRouter() {
  const location = useLocation();

  const pathname = location.pathname.split('/')[1];

    return (
      <div className="flex flex-col gap-2">
        <div style={{ position: "relative", width: "100%" }}>
          <AnimatePresence mode="popLayout">
            <Routes location={location} key={pathname}>
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<PageWrapper><Protected><Dashboard /></Protected></PageWrapper>} />
                <Route path="/widgets" element={<PageWrapper><Protected><Widgets /></Protected></PageWrapper>} />
                <Route path="/widgets/wordle" element={<WidgetWordle />} />
                <Route path="/widgets/sentence-create" element={<SentenceCreateWidget />} />
                <Route path="/widgets/sentence-fill" element={<SentenceFillWidget />} />
                <Route path="/settings" element={<PageWrapper><Protected><Settings /></Protected></PageWrapper>} />
                <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          </AnimatePresence>
        </div>
      </div>
    );
}
