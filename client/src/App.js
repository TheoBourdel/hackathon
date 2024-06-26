import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import Layout from "./layouts/Layout/layout";
import Report from "./components/Report/Report";
import Chat from "./components/Chat/Chat";
import Vocal from "./components/Vocal/Vocal";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="rapports" element={<Report />} />
          <Route path="messages" element={<h1>Messages</h1>} />
          <Route path="chat" element={<Chat />} />
          <Route path="vocal" element={<Vocal />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
