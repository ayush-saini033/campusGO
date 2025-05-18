"use server";

import { connectDB } from "@/lib/db";
import { InOut } from "@/schema/in-out.schema";
import { Student } from "@/schema/student.schema";

export async function EntryClose(rollNumber: string | null) {
  try {
    await connectDB();
    if (!rollNumber) {
      return { success: false, message: "Roll number is required" };
    }
    const roll = rollNumber.toLocaleLowerCase();

    const student = await Student.findOne({ rollNumber: roll });

    if (!student) {
      return {
        success: false,
        message: "No any student registered with this roll number",
      };
    }

    const studentId = student._id;

    const permission = await InOut.findOne({
      student: studentId,
      whereNow: "outside",
    });

    if (!permission) {
      return {
        success: false,
        message: "There is no entry open for this roll number",
      };
    }

    // console.log(permission);

    const { outFor, outTime, inTime } = permission;

    let newFine = 0;

    if (outFor !== "market") {
      if (inTime && Date.now() > inTime.getTime()) {
        console.log("fine");
        const date1 = inTime;
        const date2 = Date.now();

        const diffInMs = date2 - date1.getTime();

        // Convert to seconds
        const diffInSeconds = Math.floor(diffInMs / 1000);

        newFine = diffInSeconds / 360;

        console.log(newFine);
      }
    } else if (outFor === "market") {
      const date1 = outTime;
      const date2 = Date.now();
      const ninePM = new Date();
      ninePM.setHours(21, 0, 0, 0);

      const diffInMs = date2 - date1.getTime();

      // Convert to seconds
      const diffInSeconds = Math.floor(diffInMs / 1000);

      if (diffInSeconds > 12 * 60 * 60 || Date.now() > ninePM.getTime()) {
        newFine = diffInSeconds / 360;
      }
    }

    // Update the permission document with the fine and set whereNow to inside
    const updatedPermission = await InOut.findByIdAndUpdate(
      permission._id,
      { fine: newFine, whereNow: "inside" },
      { new: true }
    );

    // Calculate the new total fine
    const newTotalFine = student.totalFine + newFine;

    // Update the student document with the new total fine
    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      {
        totalFine: newTotalFine,
      },
      { new: true }
    );

    console.log("Updated permission:", updatedPermission);
    console.log("Updated student:", updatedStudent);

    return { success: true, message: "Entry closed successfully" };
  } catch (error: unknown) {
    console.log(error);
    return { success: false, message: "Internal server error" };
  }
}
