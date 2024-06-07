import { Root } from "pages/Root";
import { BrowserRouter } from "react-router-dom";

import { SnackbarProvider, ThemeProvider, UserProvider } from "context";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <SnackbarProvider>
          <UserProvider>
            <Root />
          </UserProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
