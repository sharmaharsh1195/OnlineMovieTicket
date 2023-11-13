import React from 'react';
import ContentWrapper from '../../contentWrapper/ContentWrapper';

import { Slider } from './Slider';
import slides from '../../../mock.json'
import GenreCarousel from './GenreCarousel'

const Home = () => {
  return (
    <div>
       
      {/* <HomeCarousel/> */}
      <Slider slides={slides}/>
     <GenreCarousel genre="action"/>
     <GenreCarousel  genre="thriller"/>
     <GenreCarousel  genre="romantic"/>
     <GenreCarousel genre="Comedy"/>
   

       
    </div>
  );
}

export default Home;
