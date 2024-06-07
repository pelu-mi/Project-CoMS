import { Root } from "pages/Root";
import { BrowserRouter } from "react-router-dom";

import {
  QueryClientProvider,
  SnackbarProvider,
  ThemeProvider,
  UserProvider,
} from "context";

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider>
        <ThemeProvider>
          <SnackbarProvider>
            <UserProvider>
              <Root />
            </UserProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
