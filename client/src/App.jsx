import { Root } from "pages/Root";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "context/ThemeProvider/ThemeProvider.jsx";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Root />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
