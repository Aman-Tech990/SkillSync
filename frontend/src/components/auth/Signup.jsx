import React, { useState, useEffect } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from "../ui/label";
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { Loader2 } from 'lucide-react';
import { setLoading } from '@/redux/authSlice';

const Signup = () => {
    const { user, loading } = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("password", input.password);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            dispatch(setLoading(true));
            const res = await axios.post("https://skillsync-ap01.onrender.com/api/v1/user/register", formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                    withCredentials: true
                }
            );
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, []);

    return (
        <div>
            <Navbar />
            <div>
                <div className='flex items-center justify-center max-w-7xl mx-auto'>
                    <form onSubmit={submitHandler} className='w-1/2 border-gray-200 rounded-md p-4 my-4'>
                        <h1 className='font-bold text-xl mb-5'>Signup</h1>
                        <div className="my-4">
                            <Label className='mb-2'>Full Name</Label>
                            <Input
                                type='text'
                                name="fullname"
                                value={input.fullname}
                                onChange={changeEventHandler}
                                placeholder='eg. Aman Parida'
                            />
                        </div>
                        <div className='my-4'>
                            <Label className='mb-2'>Email</Label>
                            <Input
                                type='email'
                                name="email"
                                value={input.email}
                                onChange={changeEventHandler}
                                placeholder='eg. aman@gmail.com'
                            />
                        </div>
                        <div className="my-4">
                            <Label className='mb-2'>Password</Label>
                            <Input
                                type='password'
                                name='password'
                                value={input.password}
                                onChange={changeEventHandler}
                                placeholder='eg. xyz123'
                            />
                        </div>
                        <div className="my-4">
                            <Label className='mb-2'>Phone Number</Label>
                            <Input
                                type='number'
                                name='phoneNumber'
                                value={input.phoneNumber}
                                onChange={changeEventHandler}
                                placeholder='eg. 98XXXXXXXX'
                            />
                        </div>
                        <div className='flex items-center justify-between'>
                            <RadioGroup className='flex items-center gap-4 my-5'>
                                <div className="flex items-center space-x-2">
                                    <Input
                                        type='radio'
                                        name='role'
                                        value='student'
                                        checked={input.role === 'student'}
                                        onChange={changeEventHandler}
                                        className='cursor-pointer'
                                        id='student'
                                    />
                                    <Label htmlFor="student">Student</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Input
                                        type='radio'
                                        name='role'
                                        value='recruiter'
                                        checked={input.role === 'recruiter'}
                                        onChange={changeEventHandler}
                                        className='cursor-pointer'
                                        id='recruiter'
                                    />
                                    <Label htmlFor="recruiter">Recruiter</Label>
                                </div>
                            </RadioGroup>
                            <div className='flex items-center gap-2'>
                                <Label>Profile</Label>
                                <Input
                                    accept="image/*"
                                    type="file"
                                    onChange={changeFileHandler}
                                    className="cursor-pointer"
                                />
                            </div>
                        </div>
                        {
                            loading ? (
                                <Button className='w-full my-4'><Loader2 className='mr-2 h-4 w-4 animate-spin'></Loader2>Please wait</Button>
                            ) : (
                                <Button type='submit' className='w-full my-4 bg-[#6A38C2]'>Signup</Button>
                            )
                        }
                        <span className='text-sm'>Already have an account? <Link to="/login" className="text-blue-800">Login</Link></span>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup;