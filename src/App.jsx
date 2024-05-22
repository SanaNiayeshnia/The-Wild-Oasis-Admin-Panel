import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import CheckIn from "./pages/CheckIn";
import Settings from "./pages/Settings";
import Users from "./pages/Users";
import Login from "./pages/Login";
import Account from "./pages/Account";
import PageNotFound from "./pages/PageNotFound";
import GlobalStyles from "./styles/GlobalStyles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "0.75rem" }}
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 5000 },
          style: { fontSize: "0.9rem", padding: "1rem" },
        }}
      />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/cabins" element={<Cabins />} />
            <Route path="/checkin/:bookingID" element={<CheckIn />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/users" element={<Users />} />
            <Route path="/login" element={<Login />} />
            <Route path="/account" element={<Account />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
