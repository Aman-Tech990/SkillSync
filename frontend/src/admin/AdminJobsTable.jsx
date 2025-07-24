import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs';
import { Edit2, Eye, MoreHorizontal } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AdminJobsTable = () => {
    useGetAllAdminJobs();
    const { allAdminJobs, searchJobByText } = useSelector(store => store.jobs);
    const [filterJob, setFilterJob] = useState(allAdminJobs);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredJobs = allAdminJobs.length > 0 && allAdminJobs.filter((jobs) => {
            if (!searchJobByText) {
                return true;
            }
            return jobs?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || jobs?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
        });
        setFilterJob(filteredJobs);
    }, [allAdminJobs, searchJobByText]);

    return (
        <div>
            <Table>
                <TableCaption>List of your recent posted jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className='text-right'>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        (!allAdminJobs || allAdminJobs.length <= 0) ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center">
                                    You have not registered any company yet.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filterJob.map((job) => (
                                <TableRow key={job._id}>
                                    <TableCell>{job?.company?.name}</TableCell>
                                    <TableCell>{job?.title}</TableCell>
                                    <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
                                    <TableCell className="text-right cursor-pointer">
                                        <Popover>
                                            <PopoverTrigger>
                                                <MoreHorizontal />
                                            </PopoverTrigger>
                                            <PopoverContent className="w-32">
                                                <div
                                                    onClick={() => navigate(`/admin/jobs/create/${job?._id}`)}
                                                    className="flex items-center gap-2 cursor-pointer"
                                                >
                                                    <Edit2 className="w-4" />
                                                    <span>Edit</span>
                                                </div>
                                                <div
                                                    onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                                                    className='flex items-center gap-2 cursor-pointer my-2'
                                                >
                                                    <Eye className='w-4' />
                                                    <span>Applicants</span>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                </TableRow>
                            ))
                        )
                    }

                </TableBody>
            </Table>
        </div >
    )
}

export default AdminJobsTable;