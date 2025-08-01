import { JOB_API_END_POINT } from '@/components/utils/constant';
import { setAllJobs } from '@/redux/jobSlice';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const { searchedQuery } = useSelector(store => store.jobs);

    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const res = await axios.get(`https://skillsync-ap01.onrender.com/api/v1/job/get?keyword=${searchedQuery}`, {
                    withCredentials: true
                })
                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllJobs();
    }, []);
}

export default useGetAllJobs;