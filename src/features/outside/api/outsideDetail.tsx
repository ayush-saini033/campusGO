"use server";

import { connectDB } from "@/lib/db";
import { InOut } from "@/schema/in-out.schema";
import { Student } from "@/schema/student.schema";

export async function outsideDetail() {
  try {
    await connectDB();

    const students = await InOut.find({ whereNow: "outside" }).populate({
      path: "student",
      model: Student, // Explicitly provide the model
    });
    console.log(students);

    const filteredStudents = JSON.parse(JSON.stringify(students));

    return {
      success: true,
      message: "Outside students data fetched successfully",
      outsideData: filteredStudents,
    };
  } catch (error: unknown) {
    console.log(error);
    return { success: false, message: "Internal server error" };
  }
}
