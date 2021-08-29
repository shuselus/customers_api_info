import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchApiData } from "./actions/appActions";
import Header from "./components/Header";
import MainArea from "./components/MainArea";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    callToFetch();
  }, []);

  const callToFetch = () => {
    dispatch(fetchApiData());
  };

  return (
    <div className="app-container">
      <Header />
      <MainArea />
    </div>
  );
}

export default App;
