import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { CoinDetail } from "./pages/CoinDetail";
import CoinsProvider from "./contexts/CoinsContext";

function App() {
  return (
    <BrowserRouter>
      <CoinsProvider>
        <Routes>
          <Route path="/" index element={<Home />}></Route>
          <Route path="/coin/:id" element={<CoinDetail />}></Route>
        </Routes>
      </CoinsProvider>
    </BrowserRouter>
  );
}

export default App;
