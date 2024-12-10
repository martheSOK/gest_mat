import { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import { Link } from "react-router-dom";
//import log from '/public/log.png'; 
//import ifn from '/public/ifn.png'; 
import images from '/public/images.png';
export default function Navbar() {
  const { user, setToken, setUser, token } = useContext(AppContext);
  return (
    <>
      <nav className=" bg-gray-500 text-white shadow-2xl  max-w-full h-20 ">
        <div className="flex  gap-96">
            <div className="flex gap-8 justify-between items-center">
            <img className="w-[90px] h-[45px] rounded" src={images} alt="logo ifnti" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">IFNTI</span>
            </div>
            <div>
              <ul> 
                <Link to="/" className="nav-link">Home</Link>
              </ul>
            </div>
            <div>
              <p className="font-extralight">Bienvenu(e){user.name}</p>
            </div>

            <div className="">
                <ul className="flex gap-8">
                  <li>About</li>
                  <li>Porfile</li>
                  <li>Logout</li>
                </ul>
            </div>
        </div>
      </nav>
    </>
  );
}
