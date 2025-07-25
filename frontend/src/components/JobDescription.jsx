import React, { useEffect } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import Navbar from './shared/Navbar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const JobDescription = () => {
    const params = useParams();
    const jobId = params.id;
    const { singleJob } = useSelector(store => store.jobs);
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();

    const isApplied = singleJob?.application?.some(
        application => application.applicant === user?._id
    );

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`https://skillsync-ap01.onrender.com/api/v1/job/apply/${jobId}`, {
                withCredentials: true
            });
            if (res.data.success) {
                const updatedSingleJob = {
                    ...singleJob,
                    application: [
                        ...singleJob.application,
                        { applicant: user?._id }
                    ]
                };
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };

    useEffect(() => {
        const fetchSingleJobById = async () => {
            try {
                const res = await axios.get(`https://skillsync-ap01.onrender.com/api/v1/job/get/${jobId}`, {
                    withCredentials: true
                });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchSingleJobById();
    }, [jobId, dispatch, user?.id]);

    return (
        <div>
            <Navbar />
            <div className="max-w-7xl mx-auto my-10">
                <h1 className="font-bold text-xl">{singleJob?.title}</h1>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 mt-4">
                        <Badge className="text-blue-600 font-bold" variant="ghost">
                            {singleJob?.position}
                        </Badge>
                        <Badge className="text-[#F83002] font-bold" variant="ghost">
                            {singleJob?.jobType}
                        </Badge>
                        <Badge className="text-[#7209b7] font-bold" variant="ghost">
                            {singleJob?.salary} LPA
                        </Badge>
                    </div>
                    <Button
                        onClick={isApplied ? null : applyJobHandler}
                        disabled={isApplied}
                        className={`rounded-lg ${isApplied
                            ? 'bg-gray-600 cursor-not-allowed text-white'
                            : 'bg-[#7209b7] hover:bg-[#5f32ad] text-white cursor-pointer'
                            }`}
                        variant="outline"
                    >
                        {isApplied ? 'Already Applied' : 'Apply Now'}
                    </Button>
                </div>
                <h1 className="border-b-2 border-b-gray-400 font-medium py-4">Job Description</h1>
                <div className="my-4">
                    <h1 className="font-bold my-2">
                        Role: <span className="pt-4 font-normal text-gray-800">{singleJob?.title}</span>
                    </h1>
                    <h1 className="font-bold my-2">
                        Location: <span className="pt-4 font-normal text-gray-800">{singleJob?.location}</span>
                    </h1>
                    <h1 className="font-bold my-2">
                        Description: <span className="pt-4 font-normal text-gray-800">{singleJob?.description}</span>
                    </h1>
                    <h1 className="font-bold my-2">
                        Experience: <span className="pt-4 font-normal text-gray-800">{singleJob?.experienceLevel}</span>
                    </h1>
                    <h1 className="font-bold my-2">
                        Salary: <span className="pt-4 font-normal text-gray-800">{singleJob?.salary} LPA</span>
                    </h1>
                    <h1 className="font-bold my-2">
                        Total Applicants: <span className="pt-4 font-normal text-gray-800">{singleJob?.application?.length}</span>
                    </h1>
                    <h1 className="font-bold my-2">
                        Posted Date:
                        <span className="pt-4 font-normal text-gray-800">
                            {new Date(singleJob?.createdAt).toLocaleString('en-IN', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric'
                            })}
                        </span>
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default JobDescription;
