import "./App.css";

import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./styles/theme";
import AppLayout from "./layouts/appLayout";

import Home from "./pages/home.pages";
import Templates from "./pages/templates.pages";
import Pictures from "./pages/pictures.pages";
import Sites from "./pages/sites.pages";
import Clients from "./pages/clients.pages";
import Projects from "./pages/projects.pages";
import React, { useCallback, useEffect } from "react";
import Login from "./pages/Login";
import { Provider, useDispatch } from "react-redux";
import store from "./store";
import ClientPhoneNumber from "./pages/clientPhoneNumber.pages";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import AuthVerify from "./contexts/slices/AuthVerify";
import { logout } from "./contexts/slices/auth";
import jwt_decode from "jwt-decode";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("home");
    }
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<AppLayout />}>
            <Route path="home" element={<Home />} />
            {/* <Route path="home" element={<Templates />} /> */}
            <Route path="templates" element={<Templates />} />
            <Route path="pictures" element={<Pictures />} />
            <Route path="sites" element={<Sites />} />
            <Route path="clients" element={<Clients />} />
            <Route
              path="clients-phone-number"
              element={<ClientPhoneNumber />}
            />
            <Route path="projects" element={<Projects />} />
          </Route>
        </Route>
      </Routes>
      <AuthVerify logOut={logOut} />
    </ChakraProvider>
  );
}

export default App;
