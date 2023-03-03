import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getById } from "../api/filmsAPI";
import { getByManyIds } from "../api/characterAPI";
import { getIdFromUrl } from '../utils/getIdFromUrl';
import { Character } from "../components/Character";

export const FilmDetailPage = () => {

  const [ film, setFilm ] = useState({});
  const [ characters, setCharacters ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ loadingCharacters, setLoadingCharacters ] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const loadData = async () => {
      const { success, data } = await getById( id );
      setFilm( data );
      setLoading( false );  
      
      loadFilmCharacters( data.characters );
    }
    setLoading( true );
    loadData();
  }, []);

  const loadFilmCharacters = async ( urls = [] ) => {
    setLoadingCharacters(true);
    const ids = urls.map( url => getIdFromUrl(url)); 
    const characters = await getByManyIds( ids );
    setCharacters(characters );
    setLoadingCharacters(false);
  }

  return (
    <div className="text-sky-300 p-10 w-full flex flex-col gap-10" style={{ height: "calc(100vh - 80px)" }}>
      {
        loading
        ? <div className="flex items-center justify-center w-full h-96"><p className="text-lg text-white">Loading...</p></div>
        : film && <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-5">
              <div className="flex flex-row items-center gap-2">
                <b className="text-white text-3xl font-medium">{ film.title }</b> <p className="mt-2">-</p> <small className="text-sky-200 mt-2">{ film.release_date }</small>
              </div>
              <p>{ film.opening_crawl }</p>
              <div>
                <p className="text-white">Director: <b>{ film.director }</b></p>
                <p className="text-white">Producer: <b>{ film.producer }</b></p>
              </div>
            </div>
            <p className="font-medium text-2xl text-100 text-white">Characters: </p>
            <div>
              {
                loadingCharacters
                ? <p className="text-lg text-white">Loading...</p>
                : characters && <div className="flex gap-4 flex-wrap p-4 justify-center">
                  {
                    characters.map( c => 
                      <Character key={c.name} { ...c } />
                    )
                  }
                </div>
              }
            </div>
          </div>
      }      
    </div>
  )
}
