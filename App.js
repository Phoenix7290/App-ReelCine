import AppNavigator from "./App/navigation/index.jsx";
import { FavoritesProvider } from "./App/context/FavoritesContext.jsx";

export default function App() {
  return (
    <FavoritesProvider>
      <AppNavigator />
    </FavoritesProvider>
  );
}
