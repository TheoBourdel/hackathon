import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import Layout from "./layouts/Layout/layout";
import Report from "./components/Report/Report";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="rapports" element={<Report />} />
          <Route path="messages" element={<h1>Messages</h1>} />
          <Route path="chat" element={<h1>Chat</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
