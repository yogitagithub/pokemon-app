import React from 'react';
import PokemonCard from './PokemonsCard';
import { CiSearch } from "react-icons/ci";
import { useState } from 'react';


const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState(""); 

    return (
        <>
        <div className="shadow-md bg-orange-200">
       
          <div className="flex justify-between items-center p-2">

            <div>
              <a href="#" className="font-bold text-2xl sm:text-3xl flex gap-2">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png" alt="Logo" className="w-37 ml-17" />
                
              </a>
           </div>



           <div className="relative w-full max-w-[400px] mr-auto ml-65">
            <input className="bg-[#f2f3f5] border-2 border-gray-600 outline-none px-6 py-1.5 rounded-[30px] w-full"
             type="text"
              placeholder="Search Pokemons..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} />
            <CiSearch className="absolute top-0 right-0 mt-2 mr-5 text-gray-500 cursor-pointer" 
            size={20} 
            onClick={() => setSearchQuery(searchQuery.trim().toLowerCase())} />
            </div>



           
            </div>
            </div>

            <div>

          

<PokemonCard searchQuery={searchQuery} />

            </div>
            </>
    )
}

export default Navbar;