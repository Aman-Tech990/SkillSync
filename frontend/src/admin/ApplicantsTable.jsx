import { PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { APPLICATION_API_END_POINT } from '@/components/utils/constant';
import { Popover } from '@radix-ui/react-popover';
import axios from 'axios';
import { MoreHorizontal } from 'lucide-react';
import React from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

const shortListingStatus = [`Accepted`, `Rejected`];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);

    const statusHandler = async (status, id) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`https://skillsync-ap01.onrender.com/api/v1/application/status/${id}/update`, { status });
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <div>
            <Table>
                <TableCaption>List of your recent applied candidates</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Full Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className='text-right'>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applicants && applicants.map((item) => (
                            <TableRow key={item?.applicant?._id}>
                                <TableCell>{item?.applicant?.fullname}</TableCell>
                                <TableCell>{item?.applicant?.email}</TableCell>
                                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                                <TableCell>
                                    {
                                        item?.applicant?.profile?.resume ? <a href={item?.applicant?.profile?.resume} target='_blank' rel='noopener noreferrer' className='text-blue-700 font-semibold cursor-pointer'>{item?.applicant?.profile?.resumeOriginalName}</a> : <span className='font-semibold'>N.A.</span>
                                    }
                                </TableCell>
                                <TableCell>{item?.applicant?.createdAt.split("T")[0]}</TableCell>
                                <TableCell className='text-right'>
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal />
                                        </PopoverTrigger>
                                        <PopoverContent className='w-32'>
                                            {
                                                shortListingStatus.map((status, index) => {
                                                    return (
                                                        <div
                                                            key={index} className='flex w-fit items-center my-2 cursor-pointer'
                                                            onClick={() => statusHandler(status, item?._id)}
                                                        >
                                                            <span>{status}</span>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    }

                </TableBody>
            </Table>
        </div >
    )
}

export default ApplicantsTable;