import Navbar from '@/components/shared/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import axios from 'axios';
import { JOB_API_END_POINT } from '@/components/utils/constant';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const PostJob = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: "",
        companyId: ""
    });
    const [loading, setLoading] = useState(false);
    const { allCompanies: companies } = useSelector(store => store.company);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
        setInput({ ...input, companyId: selectedCompany._id });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(input);
        try {
            setLoading(true);
            const res = await axios.post(`https://skillsync-ap01.onrender.com/api/v1/job/post`, input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <Navbar />
            <h1 className='flex items-center justify-center font-bold text-3xl text-[#6A38C2]'>Post a new Job</h1>
            <div className='flex items-center justify-center w-screen my-5'>
                <form onSubmit={submitHandler} className='p-8 max-w-4xl mx-auto shadow-lg rounded-md'>
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <Label>Title</Label>
                            <Input
                                type='text'
                                name='title'
                                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-2'
                                value={input.title}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                type='text'
                                name='description'
                                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-2'
                                value={input.description}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Requirements</Label>
                            <Input
                                type='text'
                                name='requirements'
                                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-2'
                                value={input.requirements}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Salary</Label>
                            <Input
                                type='text'
                                name='salary'
                                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-2'
                                value={input.salary}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input
                                type='text'
                                name='location'
                                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-2'
                                value={input.location}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Job Type</Label>
                            <Input
                                type='text'
                                name='jobType'
                                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-2'
                                value={input.jobType}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Experience Level</Label>
                            <Input
                                type='text'
                                name='experience'
                                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-2'
                                value={input.experience}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Position</Label>
                            <Input
                                type='text'
                                name='position'
                                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-2'
                                value={input.position}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label className='mb-2'>Registered Companies</Label>
                            {
                                companies.length > 0 && (

                                    <Select onValueChange={selectChangeHandler}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a Company" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {
                                                    companies.map((company) => {
                                                        return (
                                                            < SelectItem
                                                                key={company?._id}
                                                                value={company?.name?.toLowerCase()}
                                                            >
                                                                {company?.name}
                                                            </SelectItem>
                                                        )
                                                    })
                                                }
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                )
                            }
                        </div>
                    </div>
                    {
                        loading ? (<Button className='w-full mt-4'><Loader2 className='w-4 h-4 animate-spin'>Please wait</Loader2></Button>) : (<Button className='mt-4 bg-[#6A38C2] w-full'>Post new Job</Button>)
                    }
                    {
                        companies.length <= 0 && <p className='text-xs text-red-600 font-bold text-center my-3'>*Please register a Company first, before posting a new Job</p>
                    }
                </form>
            </div >
        </div >
    )
}

export default PostJob;