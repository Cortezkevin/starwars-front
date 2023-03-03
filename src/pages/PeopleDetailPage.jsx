import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getByManyIds, getById } from "../api/API";
import { Film } from "../components/Film";
import { getIdFromUrl } from '../utils/getIdFromUrl';

export const PeopleDetailPage = () => {

	const [ character, setCharacter ] = useState({});
  const [ films, setFilms ] = useState([]);
  const [ homeworld, setHomeworld ] = useState([]);

  const [ loading, setLoading ] = useState(false);
  const [ loadingFilms, setLoadingFilms ] = useState([]);
  const [ loadingHomeworld, setLoadingHomeworld ] = useState({});

  const [errorMessage, setErrorMessage] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const loadData = async () => {
      const { success, data } = await getById( "people", id );
      if(success){
        setCharacter( data );
        setLoading( false );  
        
        loadCharacterFilms( data.films );
        loadCharacterHomeworld( data.homeworld );
      }else{
        setErrorMessage("Ocurrio un error");
        setLoading( false );  
      }
    }
    setLoading( true );
    loadData();
  }, []);

  const loadCharacterFilms = async ( urls = [] ) => {
    setLoadingFilms(true);
    const ids = urls.map( url => getIdFromUrl(url)); 
    const { data } = await getByManyIds( "films", ids );
    setFilms( data );
    setLoadingFilms(false);
  }

  const loadCharacterHomeworld = async ( url ) => {
    setLoadingHomeworld(true);
    const { data } = await getById( "planets", getIdFromUrl(url) );
    setHomeworld( data );
    setLoadingHomeworld(false);
  }

  return (
    <div className="text-sky-300 p-10 w-full flex flex-col gap-10" style={{ height: "calc(100vh - 80px)" }}>
      {
        loading
        ? <div className="flex items-center justify-center w-full h-96"><p className="text-lg text-white"><i className="spin text-4xl fa-sharp fa-solid fa-spinner"></i></p></div>
        : character && errorMessage === null 
          ? <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-5">
              <div className="flex flex-row items-center gap-2">
                <b className="text-white text-3xl font-medium">{ character.name }</b>
              </div>
              <div className="flex flex-row gap-20">
                <div>
                  <p className="text-white">Gender: <b>{ character.gender }</b></p>
                  <p className="text-white">Birth Date: <b>{ character.birth_year }</b></p>
                </div>
                <div>
                  <p className="text-white">Heigth: <b>{ character.heigth }</b></p>
                  <p className="text-white">Mass: <b>{ character.mass }</b></p>
                </div>
                <div>
                  <p className="text-white">Hair Color: <b>{ character.hair_color }</b></p>
                  <p className="text-white">Skin Color: <b>{ character.skin_color }</b></p>
                </div>
              </div>
            </div>
            <p className="font-medium text-2xl text-100 text-white">Films: </p>
            <div>
              {
                loadingFilms
                ? <p className="text-lg text-white"><i className="spin text-4xl fa-sharp fa-solid fa-spinner"></i></p>
                : films && <div className="flex gap-4 flex-wrap p-4 justify-center">
                  {
                    films.map( f => 
                      <Film key={f.title} { ...f } detailed={ false } />
                    )
                  }
                </div>
              }
            </div>
            <p className="font-medium text-2xl text-100 text-white">Home World: </p>
            <div>
              {
                loadingHomeworld
                ? <p className="text-lg text-white"><i className="spin text-4xl fa-sharp fa-solid fa-spinner"></i></p>
                : homeworld && <div className="flex gap-4 flex-col p-4 justify-center">
                  <p className="text-2xl text-white">{ homeworld.name }</p>
                  <div>
                    <p>Climate: <b>{ homeworld.climate }</b></p>
                    <p>Terrain: <b>{ homeworld.terrain }</b></p>
                    <p>Population: <b>{ homeworld.population }</b></p>
                  </div>
                </div>
              }
            </div>
          </div>
          : <div className="text-center text-2xl">{ errorMessage }</div>
      }
    </div>
  )
}
