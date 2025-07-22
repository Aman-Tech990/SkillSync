import { COMPANY_API_END_POINT } from '@/components/utils/constant';
import { setSingleCompany } from '@/redux/companySlice';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useGetCompanyById = (companyId) => {
    if (!companyId) return;
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchCompanyById = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`, {
                    withCredentials: true
                })
                if (res.data.success) {
                    dispatch(setSingleCompany(res.data.company));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchCompanyById();
    }, [companyId, dispatch]);
}

export default useGetCompanyById;