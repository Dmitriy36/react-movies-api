import "./css/App.css";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import { HashRouter, Routes, Route, Link } from "react-router-dom";
import { MovieProvider } from "./contexts/MovieContext";
import NavBar from "./components/NavBar";

function App() {
  return (
    <MovieProvider>
      <HashRouter>
        <NavBar />
        <main className="main-content">
          <nav>
            <Link to="/">Home</Link>

            <br />
            <Link to="/react-movies-api/favorites">Favorites</Link>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/react-movies-api/favorites" element={<Favorites />} />
          </Routes>
        </main>
      </HashRouter>
    </MovieProvider>
  );
}

export default App;
