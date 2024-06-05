import { Root } from "pages/Root";
import { BrowserRouter } from "react-router-dom";

import { ThemeProvider } from "context/ThemeProvider";
import { UserProvider } from "context/UserProvider/UserProvider";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <UserProvider>
          <Root />
        </UserProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
