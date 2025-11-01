import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobsTable from './AppliedJobsTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';
import useGetAllAppliedJobs from '@/hooks/useGetAllAppliedJobs';

const isResume = true;

const Profile = () => {
    useGetAllAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector((store) => store.auth);

    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
                <div className='flex items-center justify-between'>
                    <div className="flex items-center gap-4">
                        <Avatar className='h-24 w-24'>
                            <AvatarImage src={user?.profile?.profilePhoto} alt='User Profile' className={'object-contain'} />
                        </Avatar>
                        <div>
                            <h1 className='font-medium text-xl'>{user.fullname}</h1>
                            <p>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button className='text-right' variant='outline' onClick={() => setOpen(true)}><Pen /></Button>
                </div>
                <div className='my-4'>
                    <div className='flex items-center gap-2 my-2'>
                        <Mail />
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-2 my-2'>
                        <Contact />
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>
                <div className='my-4'>
                    <h1>Skills</h1>
                    <div className='flex items-center gap-2 my-2'>
                        {
                            user?.profile?.skills.length != 0 ? user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>) : <span>N.A.</span>
                        }
                    </div>
                </div>
                <div className='grid w-full max-w-sm items-center gap-2'>
                    <Label className='text-md font-bold'>Resume</Label>
                    {
                        isResume ? <a
                            href={user?.profile?.resume}
                            target="_blank"
                            className='text-blue-600 w-full hover:underline cursor-pointer'>{user?.profile?.resumeOriginalName}</a> : <span>N.A.</span>
                    }
                </div>
                <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
                    <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
                    {/* Application Jobs */}
                    <AppliedJobsTable />
                </div>
                <UpdateProfileDialog open={open} setOpen={setOpen} />
            </div>
        </div>
    )
}

export default Profile;