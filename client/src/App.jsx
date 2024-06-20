/**
 * Import modules
 */
import { Root } from "pages/Root";
import { BrowserRouter } from "react-router-dom";

import {
  ColorModeProvider,
  QueryClientProvider,
  SnackbarProvider,
  ThemeProvider,
  UserProvider,
} from "context";

/**
 * Define the root component to be used to render the application
 *
 * @returns Page structure as JSX tree
 */
function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider>
        <ColorModeProvider>
          <ThemeProvider>
            <SnackbarProvider>
              <UserProvider>
                <Root />
              </UserProvider>
            </SnackbarProvider>
          </ThemeProvider>
        </ColorModeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

/**
 * Export root component
 */
export default App;
