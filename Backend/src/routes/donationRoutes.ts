import { Router } from "express";
import {
    createDonation,
    getMyDonations,
    getAllDonations,
    updateDonationStatus,
} from "../controllers/donationController";

const router = Router();

//for user purpose
router.post("/",createDonation);
router.get("/me",getMyDonations);

//for admin purpose
router.get("/admin",getAllDonations);
router.patch("/admin/:donationId",updateDonationStatus);

export default router;