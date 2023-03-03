import { Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "../ui/components/Navbar";
import { FilmsPage } from "../pages/FilmsPage";
import { FilmDetailPage } from "../pages/FilmDetailPage";
import { PeoplePage } from "../pages/PeoplePage";
import { PeopleDetailPage } from "../pages/PeopleDetailPage";

export const AppRouter = () => {
  return (
    <>
    <Navbar />
    <div className="pt-20">
      <Routes>
          <Route path="/people" element={ <PeoplePage />} />
          <Route path="/films" element={ <FilmsPage /> } />
          <Route path="/film/:id" element={ <FilmDetailPage /> } />
          <Route path="/people/:id" element={ <PeopleDetailPage />} />
          <Route path="/*" element={ <Navigate to={ "/films" } /> } />
      </Routes>
    </div>
    </>
  )
}
