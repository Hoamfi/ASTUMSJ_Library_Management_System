import mongoose ,{Schema,Document} from "mongoose";

export interface IDonation extends Document{
    user:mongoose.Types.ObjectId;
    amount:number;
    screenshot:string;
    status:"Pending"|"Approved"|"Rejected";
    createdAt:Date;
}

const donationSchema = new Schema<IDonation>(
{
    user :{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },

    amount:{
        type:Number,
        min:0,
        required:false
    },

    screenshot:{
        type:String,
        required:false,
        match:/\.(jpg|jpeg|png|gif|webp)$/i,
    },

    status:{
        type:String,
        enum:["Pending","Approved","Rejected"]
    },

    createdAt: {
        type:Date,
        default:Date.now,
    },
},
{
    timestamps: true, // Add and update automatically 
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }

);
//for frontend fast 
donationSchema.index({status:1,createdAt:-1});

donationSchema.virtual("isPending").get(function(){
    return this.status==="Pending";
});

const Donation = mongoose.model<IDonation>("Donation",donationSchema);

export default Donation;