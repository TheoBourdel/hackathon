import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import Layout from "./layouts/Layout/layout";
import Report from "./components/Report/Report";
import Chat from "./components/Chat/Chat";
import Vocal from "./components/Vocal/Vocal";
import Messages from "./components/Message/Message";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="rapports" element={<Report />} />
          <Route path="messages" element={<Messages />} />
          <Route path="chat" element={<Chat />} />
          <Route path="vocal" element={<Vocal />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
