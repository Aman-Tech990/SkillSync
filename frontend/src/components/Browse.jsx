import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { motion } from 'framer-motion';

const Browse = () => {
    useGetAllJobs();
    const dispatch = useDispatch();
    const { allJobs } = useSelector(store => store.jobs);

    useEffect(() => {
        return () => dispatch(setSearchedQuery(""));
    }, []);

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10'>
                <h1 className='font-bold text-xl my-2'>Search Results - ({allJobs.length})</h1>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {
                        allJobs.map((job) => (
                            <motion.div
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 100 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Job key={job?._id} job={job} />
                            </motion.div>
                        ))
                    }
                </div>
            </div>
        </div >
    )
}

export default Browse;