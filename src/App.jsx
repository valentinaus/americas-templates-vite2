import "./App.css";
import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./styles/theme";
import AppLayout from "./layouts/appLayout";

import Home from "./pages/home.pages";
import Templates from "./pages/templates.pages";
import Pictures from "./pages/pictures.pages";
import Sites from "./pages/sites.pages";
import Clients from "./pages/clients.pages";
import Projects from "./pages/projects.pages";

import Login from "./pages/Login";
import { Provider } from "react-redux";
import store from "./store";
import ClientPhoneNumber from "./pages/clientPhoneNumber.pages";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route index element={<Login />} />
            <Route path="/" element={<AppLayout />}>
              {/* <Route path="home" element={<Home />} /> */}
              <Route path="home" element={<Clients />} />
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
          </Routes>
        </BrowserRouter>
      </Provider>
    </ChakraProvider>
  );
}

export default App;
