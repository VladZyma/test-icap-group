import { Routes, Route, Navigate } from "react-router";
// ui
import AppLayout from "./ui/AppLayout";
import Header from "./ui/Header";
import Main from "./ui/Main";
import Footer from "./ui/Footer";
// pages
import LoginPage from "./pages/LoginPage";
import TablePage from "./pages/TablePage";

function App() {
  return (
    <AppLayout>
      <Header />

      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Navigate replace to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/table" element={<TablePage />} />
        </Route>
      </Routes>

      <Footer />
    </AppLayout>
  );
}

export default App;
