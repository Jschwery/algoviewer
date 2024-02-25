import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import GridView from "./structure/GridView";
import Container from "./structure/Container";
import { ChakraProvider } from "@chakra-ui/react";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <Container />
    </ChakraProvider>
  </React.StrictMode>
);
