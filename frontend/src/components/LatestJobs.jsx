import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.jobs);

    return (
        <div className='max-w-7xl mx-auto my-20'>
            <h1 className='font-bold text-3xl'><span className='text-[#6A38C2]'>Latest & Top </span><span>Job Openings</span></h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5'>
                {
                    allJobs.length <= 0 ? <span>Job Available</span> : allJobs?.slice(0, 6).map((job) => <LatestJobCards key={job._id} job={job} />)
                }
            </div>
        </div>
    )
}

export default LatestJobs;