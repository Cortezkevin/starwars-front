import { NavLink } from "react-router-dom"

export const Navbar = () => {
  return (
    <header className="w-full text-sky-500 text-md h-20 flex items-center px-10 border-b-2 border-sky-900 justify-center fixed z-50 bg-nav-color">
      <nav className='flex justify-between w-full items-center' >
        <img src="https://lumiere-a.akamaihd.net/v1/images/sw_logo_stacked_2x-52b4f6d33087_7ef430af.png?region=0,0,586,254" style={{ width: '100px', height: '40px'}} alt="" />
        <ul className='flex gap-4 select-none'>
          <li><NavLink to='/films' className='flex gap-2 items-center hover:text-sky-300'><i className="fa-solid fa-film"></i>Films</NavLink></li>
          <li><NavLink to='/people' className='flex gap-2 items-center hover:text-sky-300'><i className="fa-solid fa-users"></i>People</NavLink></li>
        </ul>
      </nav>
    </header>
  )
}
