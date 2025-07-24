import { APPLICATION_API_END_POINT } from "@/components/utils/constant";
import { setAllAppliedJobs } from "@/redux/jobSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const useGetAllAppliedJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAllAppliedJobs = async () => {
            try {
                const res = await axios.get(`https://skillsync-ap01.onrender.com/api/v1/application/get`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setAllAppliedJobs(res.data.applications))
                    toast.success(res.data.message);
                }
            } catch (error) {
                console.log(error);
                toast.error(error.response.data.message);
            }
        }
        fetchAllAppliedJobs();
    }, []);
}

export default useGetAllAppliedJobs;