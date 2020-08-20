import React, { useState } from 'react';
import { Carousel, CarouselItem, CarouselControl, CarouselIndicators } from 'reactstrap';

/*
    Array of items that contain source information, captions, and alt text about each item in the carousel.
*/
const items = [
    {
        src: './img/concert.jpg',
        altText: 'Party',
        caption: 'Plan Parties'
    },
    {
        src: './img/getTogethers.jpg',
        altText: 'Get Together',
        caption: 'Plan Get-Togethers'
    },
    {
        src: './img/fundraiser.jpg',
        altText: 'fundraiser',
        caption: 'Plan Fundraisers'
    },
    {
        src: './img/nightspace.jpg',
        altText: 'Slide 4',
        caption: 'Plan Anything'
    }
  ];

  /*
    Creating a carousel based off the reactstrap module. Uses a state of an activeIndex and an animating state for the active slide
    and animation effect. 
  */
 export const CreateCarousel = (props) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
  
    const next = () => {
      if (animating) return;
      const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
      setActiveIndex(nextIndex);
    }
  
    const previous = () => {
      if (animating) return;
      const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
      setActiveIndex(nextIndex);
    }
  
    const goToIndex = (newIndex) => {
      if (animating) return;
      setActiveIndex(newIndex);
    }
  
    const slides = items.map((item) => {
      return (
          
        <CarouselItem
          onExiting={() => setAnimating(true)}
          onExited={() => setAnimating(false)}
          key={item.src}
        >
        <h2 className="profile-heading">{item.caption}</h2>
          <p className="profile-heading">All On One Platform.</p>
          <img className="index-image" src={item.src} alt={item.altText}/>
        </CarouselItem>
        
      );
    });
  
    return (
      <Carousel
        activeIndex={activeIndex}
        next={next}
        previous={previous}
      >
        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
        {slides}
        <CarouselControl direction="prev" aria-label="previous" directionText="Previous" onClickHandler={previous} />
        <CarouselControl direction="next" aria-label="next" directionText="Next" onClickHandler={next} />
      </Carousel>
    );
  }
