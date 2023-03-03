import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getById, getByManyIds } from "../api/API";
import { getIdFromUrl } from '../utils/getIdFromUrl';
import { Character } from "../components/Character";
import { Planet } from "../components/Planet";
import { Specie } from "../components/Specie";

export const FilmDetailPage = () => {

  const [ film, setFilm ] = useState({});
  const [ characters, setCharacters ] = useState([]);
  const [ species, setSpecies ] = useState([]);
  const [ planets, setPlanets ] = useState([]);

  const [errorMessage, setErrorMessage] = useState(null);

  const [ loading, setLoading ] = useState(false);
  const [ loadingCharacters, setLoadingCharacters ] = useState([]);
  const [ loadingSpecies, setLoadingSpecies ] = useState([]);
  const [ loadingPlanets, setLoadingPlanets ] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const loadData = async () => {
      const { success, data } = await getById( "films" , id );
      if( success ){
        setFilm( data );
        setLoading( false );
        
        loadFilmCharacters( data.characters );
        loadFilmSpecies( data.species );
        loadFilmPlanets( data.planets );
      }else{
        setErrorMessage("Ocurrio un error");
        setLoading( false );  
      }
    }
    setLoading( true );
    loadData();
  }, []);

  const loadFilmCharacters = async ( urls = [] ) => {
    setLoadingCharacters(true);
    const ids = urls.map( url => getIdFromUrl(url)); 
    const { data } = await getByManyIds( "people", ids );
    setCharacters(data );
    setLoadingCharacters(false);
  }

  const loadFilmSpecies = async ( urls = [] ) => {
    setLoadingSpecies(true);
    const ids = urls.map( url => getIdFromUrl(url)); 
    const { data } = await getByManyIds( "species", ids );
    setSpecies(data );
    setLoadingSpecies(false);
  }

  const loadFilmPlanets = async ( urls = [] ) => {
    setLoadingPlanets(true);
    const ids = urls.map( url => getIdFromUrl(url)); 
    const { data } = await getByManyIds( "planets", ids );
    setPlanets(data );
    setLoadingPlanets(false);
  }

  return (
    <div className="text-sky-300 p-10 w-full flex flex-col gap-10" style={{ height: "calc(100vh - 80px)" }}>
      {
        loading
        ? <div className="flex items-center justify-center w-full h-96"><p className="text-lg text-white"><i className="spin text-4xl fa-sharp fa-solid fa-spinner"></i></p></div>
        : film && errorMessage === null
          ? <div className="flex flex-col gap-10">
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
                ? <p className="text-lg text-white"><i className="spin text-4xl fa-sharp fa-solid fa-spinner"></i></p>
                : characters && <div className="flex gap-4 flex-wrap p-4 justify-center">
                  {
                    characters.map( c => 
                      <Character key={c.name} { ...c } />
                    )
                  }
                </div>
              }
            </div>            
            <p className="font-medium text-2xl text-100 text-white">Planets: </p>
            <div>
              {
                loadingPlanets
                ? <p className="text-lg text-white"><i className="spin text-4xl fa-sharp fa-solid fa-spinner"></i></p>
                : planets && <div className="flex gap-4 flex-wrap p-4 justify-center">
                  {
                    planets.map( p => 
                      <Planet key={p.name} { ...p } />
                    )
                  }
                </div>
              }
            </div>
            <p className="font-medium text-2xl text-100 text-white">Species: </p>
            <div>
              {
                loadingSpecies
                ? <p className="text-lg text-white"><i className="spin text-4xl fa-sharp fa-solid fa-spinner"></i></p>
                : species && <div className="flex gap-4 flex-wrap p-4 justify-center">
                  {
                    species.map( s => 
                      <Specie key={s.name} { ...s } />
                    )
                  }
                </div>
              }
            </div>
          </div>
          : <div className="text-center text-2xl">{ errorMessage }</div>
      }
    </div>
  )
}
