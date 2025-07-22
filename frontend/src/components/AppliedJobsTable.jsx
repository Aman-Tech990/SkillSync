import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { useSelector } from 'react-redux';

const AppliedJobsTable = () => {
    const { allAppliedJobs } = useSelector(store => store.jobs);

    return (
        <div>
            <Table>
                <TableCaption>List of your Applied Jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className='text-right'>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        allAppliedJobs.length <= 0 ? <span className='text-sm font-bold text-[#6A38C2]'>You haven;t applied to any Job yet!</span> : allAppliedJobs.map((appliedJob) => (
                            <TableRow key={appliedJob?._id}>
                                <TableCell>{appliedJob?.createdAt.split(`T`)[0]}</TableCell>
                                <TableCell>{appliedJob?.job?.title}</TableCell>
                                <TableCell>{appliedJob?.job?.company?.name}</TableCell>
                                <TableCell className='text-right'><Badge className={`${appliedJob?.status === 'rejected' ? 'bg-red-600' : appliedJob?.status === 'pending' ? 'bg-gray-500' : 'bg-green-500'}`}>{appliedJob?.status?.toUpperCase()}</Badge></TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobsTable;

