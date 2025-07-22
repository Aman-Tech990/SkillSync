import Navbar from '@/components/shared/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useEffect, useState } from 'react';
import AdminJobsTable from './AdminJobsTable';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSearchJobByText } from '@/redux/jobSlice';
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs';

const JobsAdmin = () => {
    useGetAllAdminJobs();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchJobByText(input));
    }, [input]);

    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto my-10'>
                <div className='flex items-center justify-between my-6'>
                    <Input
                        className='w-fit'
                        placeholder='Filter by Job Role and Company'
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button onClick={() => navigate("/admin/jobs/create")}>New Job</Button>
                </div>
                <AdminJobsTable />
            </div>
        </div>
    )
}

export default JobsAdmin;