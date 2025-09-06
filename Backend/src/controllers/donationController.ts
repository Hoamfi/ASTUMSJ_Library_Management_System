import { Request, Response } from "express";
import Donation, { IDonation } from "../models/donationModel";

//POST /api/donations/donate
export const createDonation = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // const userId = (req as { user?: { id: string } }).user?.id;

    const donation = await Donation.create({
      user: req.body.userId,
      amount: req.body.amount,
      screenshot: req.body.screenshot,
      status: "Pending",
    });

    res.status(201).json({
      message:
        "Your donation is successufully submited you will receive a confirmation email shortly جزاكم الله خير",
      donation,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

//GET /api/donations/me
export const getMyDonations = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = (req as { user?: { id: string } }).user?.id;
    const donations: IDonation[] = await Donation.find({ user: userId }).sort({
      createdAt: -1,
    });
    res.status(200).json({ donations });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

//GET /api/admin/donations
export const getAllDonations = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const donations = await Donation.find()
      .populate("user")
      .sort({ createdAt: -1 });

    const totalAmount = donations.reduce((sum, donation) => {
      return sum + (donation.amount || 0);
    }, 0);

    res.status(200).json({
      success: true,
      data: donations,
      totalAmount,
      count: donations.length,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

//PATCH /api/admin/donations/:donationId
export const updateDonationStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { donationId } = req.params;
    const { status } = req.body;

    if (!["Pending", "Approved", "Rejected"].includes(status)) {
      res.status(400).json({ error: "Invalid status value" });
      return;
    }
    const donation = await Donation.findByIdAndUpdate(
      donationId,
      { status },
      { new: true }
    );
    if (!donation) {
      res.status(404).json({ error: "Donation not found" });
      return;
    }
    res.status(200).json({ message: "Status updated", donation });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/admin/pending

export const getPendingDonations = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const donations = await Donation.find({ status: "Pending" })
      .populate("user")
      .sort({ createdAt: -1 });

    res.status(200).json({
      donations,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
