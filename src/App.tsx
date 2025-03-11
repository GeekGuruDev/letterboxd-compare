import { BrowserRouter, Route, Routes } from "react-router";
import Homepage from "./components/pages/Homepage";
import ComparePage from "./components/pages/ComparePage";
import AppLayout from "./components/AppLayout";
import NotFoundPage from "./components/pages/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Homepage />} />
          <Route path="/compare" element={<ComparePage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
