export const Planet = ({ name, url, terrain, rotation_period, orbital_period, climate, diameter }) => {

  return (
    <div className="bg-sky-900 rounded-lg p-4 cursor-pointer hover:bg-sky-800" style={{ minWidth: "150px"}}>
      <p className="text-lg text-white text-center my-5">{ name }</p>
      <div className="flex flex-row justify-around gap-4">
        <div className="flex flex-col">
          <p className="text-sm text-sky-200">Climate: <b className="text-white">{ climate }</b></p>
          <p className="text-sm text-sky-200">Terrain: <b className="text-white">{ terrain }</b></p>
          <p className="text-sm text-sky-200">Diameter: <b className="text-white">{ diameter }</b></p>
        </div>
        <div className="flex flex-col">
          <p className="text-sm text-sky-200">Rotation Period: <b className="text-white">{ rotation_period }</b></p>
          <p className="text-sm text-sky-200">Orbital Period: <b className="text-white">{ orbital_period }</b></p>
        </div>
      </div>
    </div>
  )
}
