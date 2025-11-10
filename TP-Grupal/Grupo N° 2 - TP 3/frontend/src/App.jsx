// src/App.jsx
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/GlobalStyle";
/* import theme from "./styles/theme"; */
import AppRouter from "./router/AppRouter";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
        <AppRouter />
      </BrowserRouter>
  );
}

export default App;
