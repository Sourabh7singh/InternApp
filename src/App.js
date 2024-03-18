import { useContext } from "react";
import { DataContext } from "./Components/DataState";
import Products from "./Components/User/LandingPage";
import Dashboard from "./Components/Admin/Dashboard";

function App() {
  const {isAdmin} = useContext(DataContext);
  return (
    <>
    {isAdmin?<Dashboard key={process.env.REACT_APP_URL}/>:<Products/>}
    </>
  );
}

export default App;
