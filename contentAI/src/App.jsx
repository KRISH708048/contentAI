import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Layout from "./components/dashboard/Layout";
import Help from "./components/Sidebar/Help";
import Billing from "./components/Sidebar/Billing";
import History from "./components/Sidebar/History";
import UserProfile from "./components/Sidebar/UserProfile";
import Setting from "./components/Sidebar/Setting";
import Dashboard from "./components/dashboard/Dashboard";
import Content from "./components/content/Content";

function App() {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="Dashboard" element={<Dashboard />} />
            <Route path="Dashboard/:slug" element={<Content />} />
            <Route path="Help" element={<Help />} />
            <Route path="Billing" element={<Billing />} />
            <Route path="History" element={<History />} />
            <Route path="Profile" element={<UserProfile />} />
            <Route path="Settings" element={<Setting />} />
          </Route>
        </Routes>
      </Router>
    </RecoilRoot>
  );
}

export default App;
