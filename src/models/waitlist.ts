import { Document, Model, model, Schema } from "mongoose";

export interface TimeStamps {
  createdAt: Date;
  updatedAt: Date;
}

export interface IWaitlist extends Document, TimeStamps {
  firstName: string;
  lastName: string;
  email: string;
  userType: "investors" | "asset-listers";
  description: string;
}

const WaitlistSchema: Schema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: [true, "User's First name is required"]
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, "User's First name is required"]
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Email address is required"]
    },
    userType: {
      type: String,
      required: true,
      enum: ["asset-listers", "investors"]
    },
    description: {
      type: String,
      required: [true, "Description of asset is required"]
    }
  },
  { timestamps: true }
);

const Waitlist: Model<IWaitlist> = model("Waitlist", WaitlistSchema);

export default Waitlist;
