import React, { useRef, useState, useEffect } from 'react'

const Carrusel = () => {
    const slider = useRef()
    const [currentSlide, setCurrentSlide] = useState(0);
    const images = [...Array(25).keys()];

    const nextSlide = () => {
        if (currentSlide >= images.length - 1) {
            setCurrentSlide(0);
        } else {
            setCurrentSlide(currentSlide + 1);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 4000);
        return () => clearInterval(interval);
    }, [currentSlide]);

    return (
        <div className='mx-24'>
            <div className='flex items-center justify-center w-full h-full '>
                <div ref={slider} class='snap-x overflow-scroll scroll-smooth h-full flex items-center justify-start'>
                    {images.map((e, i) => (
                        <div key={i} className={`snap-start flex flex-shrink-0 w-auto mx-4 ${currentSlide === i ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}>
                            <img src={`https://picsum.photos/id/${i}/300/300`} alt={`images${i}`} className='object-cover object-center w-full h-full' />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Carrusel