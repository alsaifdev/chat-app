import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Privet from "./components/Privet";
import Public from "./components/Public";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Privet>
                  <Home />
                </Privet>
              }
            />
            <Route
              path="/chat/:username"
              element={
                <Privet>
                  <Chat />
                </Privet>
              }
            />
            <Route
              path="/login"
              element={
                <Public>
                  <Login />
                </Public>
              }
            />
            <Route
              path="/signup"
              element={
                <Public>
                  <Signup />
                </Public>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
