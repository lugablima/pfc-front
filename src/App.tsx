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
import ExercisesPage from "./pages/ExercisesPage";
import ExercisesProvider from "./contexts/ExercisesContext";
import Video from "./pages/Video";
import Summary from "./pages/Summary";
import ModalProvider from "./contexts/ModalContext";

function App() {
  return (
    <UserProvider>
      <ExercisesProvider>
        <ModalProvider>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" Component={SignIn} />
              <Route path="/sign-up" Component={SignUp} />
              <Route path="/modules" Component={Modules} />
              <Route path="/new-module" Component={NewModule} />
              <Route path="/modules/:moduleId/classes" Component={Classes} />
              <Route path="/modules/:moduleId/edit" Component={EditModule} />
              <Route
                path="/modules/:moduleId/classes/:classId/edit"
                Component={EditClass}
              />
              <Route path="/modules/:moduleId/new-class" Component={NewClass} />
              <Route
                path="/modules/:moduleId/classes/:classId/video"
                Component={Video}
              />
              <Route
                path="/modules/:moduleId/classes/:classId/summary"
                Component={Summary}
              />
              <Route
                path="/modules/:moduleId/classes/:classId/exercises"
                Component={ExercisesPage}
              />
            </Routes>
          </BrowserRouter>
        </ModalProvider>
      </ExercisesProvider>
    </UserProvider>
  );
}

export default App;
