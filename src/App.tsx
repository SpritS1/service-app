import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import DevicesPage from "pages/DevicesPage/DevicesPage";
import AuthorizationPage from "pages/AuthorizationPage/AuthorizationPage";
import AuthContextProvider from "contexts/AuthContext";
import RequireAuth from "components/RequireAuth/RequireAuth";

interface Props {}

const App = (props: Props) => {
  return (
    <AuthContextProvider>
      <div className="app">
        <BrowserRouter>
          <Routes>
            <Route
              index
              element={
                <RequireAuth>
                  <DevicesPage />
                </RequireAuth>
              }
            />
            <Route path="/auth/*" element={<AuthorizationPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthContextProvider>
  );
};

export default App;
