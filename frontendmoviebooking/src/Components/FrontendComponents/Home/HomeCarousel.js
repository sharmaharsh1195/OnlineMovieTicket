import React from 'react';
import { MDBCarousel, MDBCarouselItem } from 'mdb-react-ui-kit';
import ContentWrapper from '../../contentWrapper/ContentWrapper';
const HomeCarousel = () => {
  return (
    <ContentWrapper>
          <MDBCarousel showControls showIndicators dark fade interval={3000} style={{ width: "100%" }}>
            <MDBCarouselItem itemId={1} interval={2000}>
              <img src='https://mdbootstrap.com/img/new/slides/041.jpg' className='d-block w-100' alt='...' style={{ width: "100%" }}/>
            </MDBCarouselItem>
            <MDBCarouselItem itemId={2} interval={2000}>
              <img src='https://mdbootstrap.com/img/new/slides/042.jpg' className='d-block w-100' alt='...' style={{ width: "100%" }} />
            </MDBCarouselItem>
            <MDBCarouselItem itemId={3} interval={2000}>
              <img src='https://mdbootstrap.com/img/new/slides/043.jpg' className='d-block w-100' alt='...' style={{ width: "100%" }} />
            </MDBCarouselItem>
          </MDBCarousel>
      </ContentWrapper>
  );
}

export default HomeCarousel;
