import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJobs = async (req, res) => {
    try {
        const userId = req.userId;
        const jobId = req.params.id;
        if (!jobId) {
            return res.status(400).json({
                success: false,
                message: `Job ID is required!`
            })
        }
        // Checking if the user has already applied to this Job
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
        if (existingApplication) {
            return res.status(400).json({
                success: false,
                message: `You have already applied for this Job!`
            })
        }
        // Check if the Job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                success: false,
                message: `Job not found!`
            })
        }
        // Create a new Application
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId
        });

        job.application.push(newApplication._id);
        await job.save();

        return res.status(201).json({
            success: true,
            message: `Applied to Job successfully!`
        })

    } catch (error) {
        console.log(error);
    }
}

export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.userId;
        const applications = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
            path: "job",
            options: { sort: { createdAt: -1 } },
            populate: {
                path: "company",
                options: { sort: { createdAt: -1 } }
            }
        });
        if (!applications) {
            return res.status(404).json({
                success: false,
                message: `No Applications!`
            })
        }
        return res.status(200).json({
            success: true,
            message: `Applications fetched successfully!`,
            applications
        })
    } catch (error) {
        console.log(error);
    }
}

// To be viewed by admin for the number of candidancy
export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: "application",
            options: { sort: { createdAt: -1 } },
            populate: {
                path: "applicant"
            }
        }); 
        if (!job) {
            return res.status(404).json({
                success: false,
                message: `Job not found!`
            })
        }
        return res.status(200).json({
            success: true,
            job
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;
        if (!status) {
            return res.status(400).json({
                success: false,
                message: `Status is required!`
            })
        }
        // Find the Application by Application Id
        const application = await Application.findOne({ _id: applicationId });
        if (!application) {
            return res.status(404).json({
                success: false,
                message: `Application not found!`
            })
        }
        //Update Status
        application.status = status.trim().toLowerCase();
        await application.save();

        return res.status(200).json({
            success: true,
            message: `Status updated successfully!`
        })
    } catch (error) {
        console.log(error);
    }
}