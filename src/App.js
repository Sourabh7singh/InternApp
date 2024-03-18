import { useContext } from "react";
import { DataContext } from "./Components/DataState";
import Products from "./Components/User/LandingPage";
import Dashboard from "./Components/Admin/Dashboard";

function App() {
  const {isAdmin} = useContext(DataContext);
  return (
    <>
    {isAdmin?<Dashboard/>:<Products/>}
    </>
  );
}

export default App;
