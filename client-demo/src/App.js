import { useContext } from "react";
import Loader from "react-loader-spinner";
import "./App.css";
import { GlobalAuthProvider } from "./context/Auth/AuthContext";
import { GlobalPostProvider } from "./context/Posts/PostContext";
import RecaptaContextProvider from "./context/RecaptaContext";
import Posts from "./Posts";

function App() {
  const { token, loading } = useContext(RecaptaContextProvider);
  return loading ? (
    <div className="initialLoader">
      <Loader
        type="Bars"
        color="#00BFFF"
        height={50}
        width={50}
        timeout={3000} //3 secs
      />
    </div>
  ) : (
    <GlobalAuthProvider>
      <GlobalPostProvider>
        <Posts />
      </GlobalPostProvider>
    </GlobalAuthProvider>
  );
}

export default App;
