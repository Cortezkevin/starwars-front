import { useEffect, useState } from "react"
import { getAll } from "../api/filmsAPI";
import { useNavigate } from "react-router-dom";
import { getIdFromUrl } from '../utils/getIdFromUrl';

export const FilmsPage = () => {

  const navigate = useNavigate();

  const [ data, setData ] = useState({
    results: [],
    count: 0
  });
  const [ loading, setLoading ] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const { results, count } = await getAll( );
      setData({ results, count });
      setLoading(false);
    }
    setLoading(true);
    loadData();  
  },[ ]);

  return (
    <div className="p-5 w-full flex flex-col gap-10" style={{ height: "calc(100vh - 80px)" }}>
      <h1 className="text-2xl text-center text-white">Films</h1>
      <p className="text-white">Film Counts: { loading ? "..." : data.count } </p>
      <div className="flex gap-4">
        { 
          !loading
          ? data.results.map( f => 
            <div onClick={ () => navigate(`/film/${getIdFromUrl(f.url)}`) } className="hover:-translate-y-6 hover:bg-sky-800 duration-300 cursor-pointer relative text-sky-300 rounded-lg bg-sky-900 px-5 pt-5 pb-12 flex flex-col gap-5" key={ f.episode_id }>
              <b className="text-white text-lg">{f.title}</b>
              <p className="text-sm">{f.opening_crawl}</p>
              <small className="absolute bottom-4 left-4">{f.release_date}</small>
            </div>
          )
          : <div className="flex items-center justify-center w-full h-96"><p className="text-lg text-white">Loading...</p></div>
        }
      </div>

    </div>
  )
}
