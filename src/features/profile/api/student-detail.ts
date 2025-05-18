"use server";

import { connectDB } from "@/lib/db";
import { InOut } from "@/schema/in-out.schema";
import { Student } from "@/schema/student.schema";

export async function StudentDetail(rollNumber: string | null) {
  try {
    if (!rollNumber) {
      return { success: false, message: "Roll number is required" };
    }

    await connectDB();

    const student = await Student.findOne({ rollNumber });
    if (!student) {
      return {
        success: false,
        message: "Student is not registered with this email",
      };
    }
    const permissions = await InOut.find({ student: student._id });

    const filteredStudent = JSON.parse(JSON.stringify(student))
    const filteredPermissions = JSON.parse(JSON.stringify(permissions))


    return {
      success: true,
      message: "Profile search sucessfully",
      detail: filteredStudent,
      permissions: filteredPermissions,
    };
  } catch (error: unknown) {
    console.log(error);
    return { success: false, message: "Internal server error" };
  }
}
