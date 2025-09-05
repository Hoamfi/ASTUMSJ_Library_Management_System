import { Router } from "express";
import {
  createDonation,
  getMyDonations,
  getAllDonations,
  updateDonationStatus,
  getPendingDonations,
} from "../controllers/donationController";

import auth from "../middleware/auth";

const router = Router();

//for user purpose
router.post("/donate", auth, createDonation);
router.get("/me", getMyDonations);

//for admin purpose
router.get("/admin/all", getAllDonations);
router.patch("/admin/updatestatus/:donationId", updateDonationStatus);
router.get("/admin/pending",getPendingDonations);

export default router;
