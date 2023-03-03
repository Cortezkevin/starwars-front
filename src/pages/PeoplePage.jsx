import { useEffect, useState } from "react"
import { getAll } from "../api/API";
import { useNavigate } from "react-router-dom";
import { getIdFromUrl } from '../utils/getIdFromUrl';
import { Character } from "../components/Character";

export const PeoplePage = () => {
	const navigate = useNavigate();

	const [ data, setData ] = useState({
		results: [],
		count: 0
	});

	const [errorMessage, setErrorMessage] = useState(null);

	const [ page, setPage ] = useState(1);
	const [ loading, setLoading ] = useState(false);
	const [isLast, setIsLast] = useState(false);
	const [isFirst, setIsFirst] = useState(false);

	useEffect(() => {
		const loadData = async () => {
			const { data: { results, count, previous, next }, success } = await getAll( "people", page );
			if( success ){
				setData({ results, count });
				setLoading(false);
				if( !previous ){
					setIsFirst( true );
				}else{
					setIsFirst( false );
				}if( !next ){
					setIsLast( true );
				}else{
					setIsLast( false );
				}
			}else {
				setErrorMessage("Ocurrio un error");
				setLoading(false);
			}
		}
		setLoading(true);
		loadData();  
	},[ page ]);

return (
    <div className="p-5 w-full flex flex-col gap-10" style={{ height: "calc(100vh - 80px)" }}>
      <h1 className="text-2xl text-center text-white">Characters</h1>
      <p className="text-white">Characters Counts: { loading ? "..." : errorMessage === null ? data.count : errorMessage } </p>
      <div className="flex gap-4 flex-wrap justify-center">
        { 
          loading
          ? <div className="flex items-center justify-center w-full h-80"><p className="text-lg text-white"><i className="spin text-4xl fa-sharp fa-solid fa-spinner"></i></p></div>
          : errorMessage == null 
						? data.results.map( c => 
							<Character key={c.name} { ...c } />
						)
						: <div className="text-center text-2xl">{ errorMessage }</div> 
        }
      </div>
	  <div className="w-full flex justify-center text-sky-200 gap-4 items-center">
        <button className="bg-sky-900 p-4 rounded-md hover:bg-sky-800 duration-300" disabled={ isFirst || loading } onClick={ () => setPage( page - 1 )}>Prev Page</button>
        <p>{ page }</p>
        <button className="bg-sky-900 p-4 rounded-md hover:bg-sky-800 duration-300" disabled={ isLast || loading } onClick={ () => setPage( page + 1 )}>Next Page</button>
      </div>
    </div>
  )
}
