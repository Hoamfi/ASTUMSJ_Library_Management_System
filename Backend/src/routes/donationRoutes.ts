import { Router } from "express";
import {
  createDonation,
  getMyDonations,
  getAllDonations,
  updateDonationStatus,
} from "../controllers/donationController";

import auth from "../middleware/auth";

const router = Router();

//for user purpose
router.post("/donate", auth, createDonation);
router.get("/me", getMyDonations);

//for admin purpose
router.get("/admin", getAllDonations);
router.patch("/admin/:donationId", updateDonationStatus);

export default router;
