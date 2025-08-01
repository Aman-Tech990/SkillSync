import React from 'react';
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const Job = ({ job }) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (24 * 60 * 60 * 1000));
    }

    return (
        <div className='p-5 rounded-md shadow-xl bg-white border-gray-100'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-600'>{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)}`}</p>
                <Button variant='outline' className='rounded-full' size='icon'><Bookmark /></Button>
            </div>
            <div className='flex items-center gap-2 my-2'>
                <Button className='p-6' size='icon' variant='outline'>
                    <Avatar>
                        <AvatarImage src={job?.company?.logo} className='object-contain' />
                        <AvatarFallback>Company Logo</AvatarFallback>
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-600'>India</p>
                </div>
            </div>
            <div>
                <h1 className='text-lg my-2 font-bold'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className='text-blue-700 font-bold' variant='ghost'>{job?.position}</Badge>
                <Badge className='text-[#F83002] font-bold' variant='ghost'>{job?.jobType}</Badge>
                <Badge className='text-[#7209b7] font-bold' variant='ghost'>{job?.salary} LPA</Badge>
            </div>
            <div className='flex items-center gap-4 mt-4'>
                <Button variant='outline' onClick={() => navigate(`/description/${job?._id}`)}>Details</Button>
                <Button className='bg-[#7209b7]'>Save for Later</Button>
            </div>
        </div>
    )
}

export default Job;