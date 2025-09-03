import { Request,Response } from "express";
import Donation,{IDonation} from "../models/donationModel";

//POST /api/donations
export const createDonation = async(req:Request,res:Response):Promise<void> => {
    try{
        const userId=(req as {user?: {id:string}}).user?.id;

        const donation= await Donation.create({
            user:userId,
            amount:req.body.amount,
            reference:req.body.amount,
            screenshot:req.body.screenshot,
            status:"Pending",
        });
        res.status(201).json({ message: "Donation submitted جزاكم الله خير", donation });
    } catch(error:any){
        res.status(400).json({ error: error.message });
    }   
};

//GET /api/donations/me
export const getMyDonations = async (req:Request,res:Response):Promise<void> =>{
    try{
        const userId=(req as {user?:{id:string}}).user?.id;
        const donations:IDonation[]=await Donation.find({ user: userId }).sort({ createdAt: -1 });
           res.status(200).json({ donations });
    } catch(error: any) {
        res.status(500).json({ error: error.message });
    }
};

