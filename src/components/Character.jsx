import { useNavigate } from "react-router-dom";
import { getIdFromUrl } from '../utils/getIdFromUrl';

export const Character = ({ name, birth_year, gender, height, mass, url, detailed = true }) => {

  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/people/${getIdFromUrl(url)}`)} className="bg-sky-900 rounded-lg p-4 cursor-pointer hover:bg-sky-800" style={{ minWidth: "150px"}}>
        <p className="text-lg text-white text-center my-5">{ name }</p>
        <div className="flex flex-row justify-around gap-4">
            <div className="flex flex-col">
            <p className="text-sm text-sky-200">Birth Date: <b className="text-white">{ birth_year }</b></p>
            <p className="text-sm text-sky-200">Gender: <b className="text-white">{ gender }</b></p>
            </div>
            <div className="flex flex-col">
            <p className="text-sm text-sky-200">Height: <b className="text-white">{ height }</b></p>
            <p className="text-sm text-sky-200">Mass: <b className="text-white">{ mass }</b></p>
            </div>
        </div>
        </div>
  )
}
