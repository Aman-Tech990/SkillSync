import { Job } from "../models/job.model.js";

/* JOB CREATED BY ADMIN */
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.userId;
        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                success: false,
                message: `All fields are required!`
            })
        }
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: Number(experience),
            position,
            company: companyId,
            created_by: userId
        })

        return res.status(200).json({
            success: true,
            message: `New Job created successfully!`,
            job
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server error while creating job"
        });
    }
}

/* JOBS FOR USERS */
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        }
        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });
        if (!jobs) {
            return res.status(404).json({
                success: false,
                message: `Jobs not found!`
            })
        }
        return res.status(200).json({
            success: true,
            message: `Jobs fetched successfully!`,
            jobs
        })
    } catch (error) {
        console.log(error);
    }
}

/* SINGLE JOB AS PER USER SEARCH */
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: `application`
        });
        if (!job) {
            return res.status(404).json({
                success: false,
                message: `Job not found!`
            })
        }
        return res.status(200).json({
            success: true,
            message: `Job found successfully!`,
            job
        })
    } catch (error) {
        console.log(error);
    }
}


/* TOTAL JOB CREATED BY ADMIN */
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.userId;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path: `company`
        });
        if (!jobs) {
            return res.status(404).json({
                success: false,
                message: `Jobs not found!`
            })
        }
        return res.status(200).json({
            success: true,
            message: `Jobs fetched successfully!`,
            jobs
        })
    } catch (error) {
        console.log(error);
    }
}