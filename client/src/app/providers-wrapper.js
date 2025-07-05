"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/redux/store";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { usePathname } from "next/navigation";

export default function ProvidersWrapper({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {!isAdminRoute && <Navbar />}
        <main>
          {!isAdminRoute && <div className=''></div>}
          <ToastContainer />
          <ScrollToTopButton />
          {children}
        </main>
        {!isAdminRoute && <Footer />}
      </PersistGate>
    </Provider>
  );
}
