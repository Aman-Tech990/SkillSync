import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from "../ui/label";
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const Login = () => {
    const { user, loading } = useSelector((store) => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: ""
    });

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post("http://localhost:8080/api/v1/user/login", input,
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                }
            );
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
                navigate("/");
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
                    <form onSubmit={submitHandler} className='w-1/2 border-gray-200 rounded-md p-4 my-10'>
                        <h1 className='font-bold text-xl mb-5'>Login</h1>
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
                        </div>
                        {
                            loading ? (
                                <Button className='w-full my-4'><Loader2 className='mr-2 h-4 w-4 animate-spin'></Loader2>Please wait</Button>
                            ) : (
                                <Button type='submit' className='w-full my-4 bg-[#6A38C2]'>Login</Button>
                            )
                        }
                        <span className='text-sm'>Don't have an account? <Link to="/signup" className="text-blue-800">Signup</Link></span>
                    </form>
                </div>
            </div>
        </div >
    )
}

export default Login;