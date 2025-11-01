import { COMPANY_API_END_POINT } from '@/components/utils/constant';
import { setAllCompanies } from '@/redux/companySlice';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useGetAllCompanies = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllCompanies = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/v1/company/get`, {
                    withCredentials: true
                })
                if (res.data.success) {
                    dispatch(setAllCompanies(res.data.companies));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllCompanies();
    }, [dispatch]);
}

export default useGetAllCompanies;