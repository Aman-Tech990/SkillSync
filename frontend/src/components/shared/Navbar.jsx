import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { LogOut, User2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import { setUser } from '@/redux/authSlice';

const Navbar = () => {
    const { user } = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`https://skillsync-ap01.onrender.com/api/v1/user/logout`, {
                withCredentials: true
            })
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message);
        }
    }

    return (
        <div className='bg-white'>
            <div className='flex items-center justify-between max-w-7xl mx-auto h-16'>
                <div>
                    <h1 className='text-2xl font-bold'>Skill<span className='text-[#F83002]'>Sync</span></h1>
                </div>
                <div className='flex items-center gap-10'>
                    <ul className='flex items-center gap-5 font-medium'>
                        {
                            user && user?.role === `recruiter` ? (
                                <>
                                    <li><Link to="/admin/companies">Companies</Link></li>
                                    <li><Link to="/admin/jobs">Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/jobs">Jobs</Link></li>
                                    <li><Link to="/browse">Browse</Link></li>
                                </>
                            )
                        }
                    </ul>
                    {
                        !user ? (
                            <div className='flex items-center gap-2'>
                                <Link to="/login"><Button variant='outline'>Login</Button></Link>
                                <Link to="/signup"><Button className='bg-[#6A38C2] hover:bg-[#4e3d6b]'>Signup</Button></Link>
                            </div>
                        ) :
                            (
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Avatar className='cursor-pointer'>
                                            <AvatarImage src={user?.profile?.profilePhoto} className={'object-cover'} />
                                            <AvatarFallback>DP</AvatarFallback>
                                        </Avatar>
                                    </PopoverTrigger>
                                    <PopoverContent className='w-80'>
                                        <div className='flex items-center gap-3 space-y-2'>
                                            <Avatar>
                                                <AvatarImage src={user?.profile?.profilePhoto} />
                                            </Avatar>
                                            <div>
                                                <h4 className='font-medium'>{user?.fullname}</h4>
                                                <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col my-2 text-gray-600'>
                                            {
                                                user && user?.role === "student" && (
                                                    <div className='flex w-fit items-center gap-2'>
                                                        <User2 />
                                                        <Button variant='link'><Link to="/profile">View Profile</Link></Button>
                                                    </div>
                                                )
                                            }
                                            <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                <LogOut />
                                                <Button
                                                    variant='link' onClick={logoutHandler}>
                                                    Logout
                                                </Button>
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            )
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar;