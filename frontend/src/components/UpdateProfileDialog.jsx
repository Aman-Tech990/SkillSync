import React, { useState } from 'react'
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';
import axios from 'axios';

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    const [input, setInput] = useState({
        fullname: user?.fullname || '',
        email: user?.email || '',
        phoneNumber: user?.phoneNumber || '',
        bio: user?.profile?.bio || '',
        skills: user?.profile?.skills?.map(skill => skill) || "",
        file: user?.profile?.resume || null
    });

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append(`fullname`, input.fullname);
        formData.append(`email`, input.email);
        formData.append(`phoneNumber`, input.phoneNumber);
        formData.append(`bio`, input.bio);
        formData.append(`skills`, input.skills);
        if (input.file) {
            formData.append(`file`, input.file);
        }
        try {
            setLoading(true);
            const res = await axios.post(`https://skillsync-ap01.onrender.com/api/v1/user/profile/update`, formData, {
                headers: {
                    'Content-type': 'multipart/form-data'
                },
                withCredentials: true
            })
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
                setOpen(false);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
        console.log(input);
    }

    return (
        <div>
            <Dialog open={open}>
                <DialogContent className='sm:max-w-[425px]' onInteractOutside={() => setOpen(false)}>
                    <DialogHeader>
                        <DialogTitle>Update Profile</DialogTitle>
                        <DialogDescription>Make changes to your profile below. Click Update when done.</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={submitHandler}>
                        <div className='grid gap-4 py-4'>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor='name'>Name</Label>
                                <Input
                                    id='name'
                                    name='fullname'
                                    value={input.fullname}
                                    onChange={changeEventHandler}
                                    type='text'
                                    className='col-span-3'
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor='email'>Email</Label>
                                <Input
                                    id='email'
                                    name='email'
                                    value={input.email}
                                    onChange={changeEventHandler}
                                    type='email'
                                    className='col-span-3'
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor='phoneNumber'>Phone Number</Label>
                                <Input
                                    id='phoneNumber'
                                    name='phoneNumber'
                                    value={input.phoneNumber}
                                    onChange={changeEventHandler}
                                    type='number'
                                    className='col-span-3'
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor='bio'>Bio</Label>
                                <Input
                                    id='bio'
                                    name='bio'
                                    value={input.bio}
                                    onChange={changeEventHandler}
                                    type='text'
                                    className='col-span-3'
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor='skills'>Skills</Label>
                                <Input
                                    id='skills'
                                    name='skills'
                                    value={input.skills}
                                    onChange={changeEventHandler}
                                    type='text'
                                    className='col-span-3'
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor='file'>Resume</Label>
                                <Input
                                    id='file'
                                    name='file'
                                    onChange={changeFileHandler}
                                    type='file'
                                    accept='application/pdf'
                                    className='col-span-3'
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            {
                                loading ? <Button className='w-full my-4'><Loader2 className='h-4 w-4 animate-spin' />Please wait</Button> : <Button type='submit' className='w-full my-4 bg-[#6A38C2]'>Update</Button>
                            }
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default UpdateProfileDialog;