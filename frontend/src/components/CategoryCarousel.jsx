import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
    `Frontend Developer`,
    `Backend Developer`,
    `Full Stack Developer`,
    `App Developer`,
    `Data Science`,
    `AI Engineer`,
    `Graphic Designer`
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div>
            <Carousel className='w-full xs:w-3xs sm:max-w-xl mx-auto my-20'>
                <CarouselContent>
                    {
                        category.map((cat, index) => (
                            <CarouselItem key={index} className='sm:basis-1/2 md:basis-1/3'>
                                <Button onClick={() => { searchJobHandler(cat) }} variant='outline' className='rounded-full'>{cat}</Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div >
    )
}

export default CategoryCarousel;