import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/Main";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "#0d1117",
        color: "white",
      },
    },
  },
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="*" element={<MainPage />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
