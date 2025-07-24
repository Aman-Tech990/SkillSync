import Navbar from '@/components/shared/Navbar';
import React, { useEffect } from 'react';
import ApplicantsTable from './ApplicantsTable';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';
import axios from 'axios';

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { applicants } = useSelector(store => store.application);
    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get("https://skillsync-ap01.onrender.com/api/v1/application/applicants", {
                    withCredentials: true
                });

                if (res.data.success) {
                    dispatch(setAllApplicants(res.data.job.application));
                }

            } catch (error) {
                console.log(error);
            }
        }
        fetchAllApplicants();
    }, []);

    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto'>
                <h1 className='text-xl font-bold my-6'>Applicants - {applicants?.length}</h1>
                <ApplicantsTable />
            </div>
        </div>
    )
}

export default Applicants;