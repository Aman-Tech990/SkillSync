import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='text-center xs:w-3xs mx-auto'>
            <div className='flex flex-col gap-5 my-10'>
                <span className='bg-gray-100 text-[#8F3002] font-medium px-4 py-3 rounded-full mx-auto'>No. 1 Job Hunt Website</span>
                <h1 className='text-3xl md:text-5xl font-bold'>Search, Apply & <br /> Get Your <span className='text-[#6A38C2]'>Dream Jobs</span></h1>
                <p className='text-sm md:text-normal'>Welcome to one of the finest and most relaiable Job Portal - where you exactly bridges your skills and your career.</p>
                <div className='flex md:w-[40%] shadow-lg border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
                    <input
                        type='text'
                        placeholder='Find your dream jobs'
                        onChange={(e) => setQuery(e.target.value)}
                        className='w-full outline-none border-none'
                    />
                    <Button onClick={searchJobHandler} className='rounded-r-full bg-[#6A38C2]'>
                        <Search className='h-4 w-4' />
                    </Button>
                </div>
            </div>

        </div >
    )
}

export default HeroSection;