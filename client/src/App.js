import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import Layout from "./layouts/Layout/layout";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
