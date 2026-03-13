import { Routes, Route } from "react-router";
import CommonLayouts from "./components/CommonLayouts";
import DashboardPage from "./pages/DashboardPage";

const App = () => {
  return (
    <Routes>
      <Route element={<CommonLayouts />}>
        <Route index element={<DashboardPage />} />
        {/* <Route path="/settings/profile" element={<EdittProfilePage />} /> */}
      </Route>
    </Routes>
  );
};

export default App;
