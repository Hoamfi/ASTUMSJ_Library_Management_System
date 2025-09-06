import { Router } from "express";
import {
  createDonation,
  getUserDonation,
  getAllDonations,
  updateDonationStatus,
  getPendingDonations,
  getTotalDonations,
} from "../controllers/donationController";

import auth from "../middleware/auth";
import isAdmin from "@/middleware/admin";

const router = Router();

//for user purpose
router.post("/donate", auth, createDonation);

//for admin purpose
router.get("/admin/all", auth, isAdmin, getAllDonations);
router.get("/admin/userdonation/:userId", auth, isAdmin, getUserDonation);
router.patch(
  "/admin/updatestatus/:donationId",
  auth,
  isAdmin,
  updateDonationStatus
);
router.get("/admin/pending", auth, isAdmin, getPendingDonations);
router.get("/admin/totaldonations", auth, isAdmin, getTotalDonations);

export default router;
