import mongoose, { Document, Schema } from "mongoose";

export interface IStudent extends Document {
    fullName: string,
    email: string,
    rollNumber: string,
    phone: string,
    parentPhone: string,
    profilePic: string,
    totalFine: number,
    createdAt: Date,
    updatedAt: Date,
}

const studentSchema = new Schema<IStudent>({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  rollNumber: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  parentPhone: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
    default: "",
  },
  totalFine: {
    type : Number,
    default: 0
  }
}, {timestamps: true});

export const Student =
  mongoose.models?.Student || mongoose.model<IStudent>("Student", studentSchema);
