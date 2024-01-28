import "./assets/styles/reset.css";
import "./assets/styles/styles.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Modules from "./pages/Modules";

import UserProvider from "./contexts/UserContext";
import NewModule from "./pages/NewModule";
import Classes from "./pages/Classes";
import NewClass from "./pages/NewClass";
import EditModule from "./pages/EditModule";
import EditClass from "./pages/EditClass";
import Video from "./pages/Video";

function App() {
  return (
    <UserProvider>
              <Route
                path="/modules/:moduleId/classes/:classId/video"
                Component={Video}
              />
    </UserProvider>
  );
}

export default App;
