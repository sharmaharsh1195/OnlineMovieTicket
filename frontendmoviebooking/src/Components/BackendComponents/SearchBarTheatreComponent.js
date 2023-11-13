import React from 'react';

const SearchBarTheatreComponent = () => {
  return (
    <div>
       <div class=" bg-slate-400 flex flex-col items-center justify-center">
      <div class="w-11/12 md:w-8/12 xl:w-1/2 h-auto p-5 rounded-2xl bg-white flex flex-col">
         
         <section class="w-full h-10 flex items-center">
            
            <span class="w-10 h-full hidden md:flex items-center">
               <i class="uil uil-search-alt text-xl text-blue-800"></i>
            </span>
            
            <input type="text" class="w-full h-full font-medium md:pl-2 focus:outline-none searchInput"
               placeholder="Search what you want ..." />
           
            <button
               class="w-28 h-full bg-blue-800 flex justify-center items-center rounded-2xl text-white font-medium">Search</button>
         </section>
        
         <section class="w-full h-auto hidden flex-col gap-y-2 mt-8 resultsContainer"></section>
      </div>
   </div>
    </div>
  );
}

export default SearchBarTheatreComponent;
