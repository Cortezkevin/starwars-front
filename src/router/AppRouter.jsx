import { Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "../ui/components/Navbar";
import { HomePage } from "../pages/HomePage";
import { FilmsPage } from "../pages/FilmsPage";
import { FilmDetailPage } from "../pages/FilmDetailPage";

export const AppRouter = () => {
  return (
    <>
    <Navbar />
    <div className="pt-20">
      <Routes>
          <Route path="/home" element={ <HomePage />} />
          <Route path="/people" element={ <h1>PEOPLE</h1>} />
          <Route path="/films" element={ <FilmsPage /> } />
          <Route path="/film/:id" element={ <FilmDetailPage /> } />
          <Route path="/*" element={ <Navigate to={ "/home" } /> } />
      </Routes>
    </div>
    </>
  )
}
