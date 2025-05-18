import mongoose, { Schema } from "mongoose";
interface IInOut extends Document {
    student : mongoose.Schema.Types.ObjectId,
    outFor: string,
    outTime: Date,
    inTime: Date,
    whereNow: string,
    fine: number,
    createdAt: Date,
    updatedAt: Date
}

const inOutSchema = new Schema<IInOut>({
    student : {
        type: Schema.Types.ObjectId,
        ref: "Student"
    },
    outFor: {
        type: String,
        required: true,
        enum: ["market", "home", "hospital", "trip"]
    },
    outTime: {
        type: Date,
        required: true,
    },
    inTime: {
        type: Date,
    },
    whereNow: {
        type: String,
        enum: ["inside", "outside"],
        required: true
    },
    fine: {
        type: Number,
        default: 0,
        required: true
    }
}, {timestamps: true})

export const InOut = mongoose.models.InOut || mongoose.model<IInOut>("InOut", inOutSchema)