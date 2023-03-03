import { useNavigate } from "react-router-dom";
import { getIdFromUrl } from '../utils/getIdFromUrl';

export const Film = ({ detailed = true, title, opening_crawl, release_date, url }) => {

	const navigate = useNavigate();

  return (
    <div onClick={ () => navigate(`/film/${getIdFromUrl(url)}`) } className={`${detailed ? 'hover:-translate-y-6' : ''} hover:bg-sky-800 duration-300 cursor-pointer relative text-sky-300 rounded-lg bg-sky-900 px-5 pt-5 pb-12 flex flex-col gap-5`}>
        <b className="text-white text-lg">{title}</b>
        <p className="text-sm">{opening_crawl}</p>
        <small className="absolute bottom-4 left-4">{release_date}</small>
    </div>
  )
}
