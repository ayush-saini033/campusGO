"use server";
import { connectDB } from "@/lib/db";
import { InOut } from "@/schema/in-out.schema";
import { Student } from "@/schema/student.schema";

interface IFormData {
  outFor: string;
  inTime: Date | undefined;
  rollNumber: string;
}

export async function PermitSave(formData: IFormData) {
  const { outFor, inTime, rollNumber } = formData;
  await connectDB();
  try {
    if (!outFor || !inTime || !rollNumber ) {
      return { success: false, message: "Fill all the fields" };
    }

    const student = await Student.findOne({ rollNumber });

    if(!student) {
        return {success: false, message: "No any student registered with this email"}
    }

    const prevPermissions = await InOut.find({student: student._id});

    for (const permission of prevPermissions) {
      if (permission.whereNow === "outside") {
        return {
          success: false,
          message: "Currently this roll number is not available",
        };
      }
    }
    const permission  = await InOut.create({
        student : student._id,
        outFor,
        inTime,
        outTime: Date.now(),
        whereNow: "outside",
        fine: 0
    })

    console.log(permission);

    return {
        success: true,
        message: "Permission approved successdully"
    }
  } catch (error: unknown) {
    console.log(error);
    return {
        success: false, 
        message: "Internal server error"
    }
  }
}
