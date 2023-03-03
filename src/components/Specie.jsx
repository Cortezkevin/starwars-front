export const Specie = ({ name, url, classification, designation, average_height, average_lifespan,  }) => {
    return (
      <div className="bg-sky-900 rounded-lg p-4 cursor-pointer hover:bg-sky-800" style={{ minWidth: "150px"}}>
        <p className="text-lg text-white text-center my-5">{ name }</p>
        <div className="flex flex-row justify-around gap-4">
            <div className="flex flex-col">
              <p className="text-sm text-sky-200">Classification: <b className="text-white">{ classification }</b></p>
              <p className="text-sm text-sky-200">Designation: <b className="text-white">{ designation }</b></p>
            </div>
            <div className="flex flex-col">
              <p className="text-sm text-sky-200">Average Height: <b className="text-white">{ average_height }</b></p>
              <p className="text-sm text-sky-200">Average Lifespan: <b className="text-white">{ average_lifespan }</b></p>
            </div>
        </div>
      </div>
    )
}
