import ContextProvider from "./context/ContextProvider";
import { NavigationContainer } from "@react-navigation/native";
import NavigationApp from "./src/Navigations";

export default function App() {
  return (
    <ContextProvider>
      <NavigationContainer>
        <NavigationApp />
      </NavigationContainer>
    </ContextProvider>
  );
}
