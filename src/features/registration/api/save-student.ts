"use server";

import cloudinary from "@/lib/cloudinary";
import { connectDB } from "@/lib/db";
import { Student } from "@/schema/student.schema";
import { v4 as uuidv4 } from "uuid";

export interface IformData {
  fullName: string;
  email: string;
  rollNumber: string;
  phone: string;
  parentPhone: string;
  profilePic: File | null;
}

export async function SaveStudent(formData: IformData) {

    console.log(formData)
  const { fullName, email, rollNumber, parentPhone, phone, profilePic } =
    formData;

  if (!fullName || !email || !rollNumber || !parentPhone || !phone) {
    return {
      success: false,
      message: "Please fill all required fields",
    };
  }

  await connectDB();

  try {
    const isExistingStudent = await Student.findOne({ rollNumber });
    if (isExistingStudent) {
      return { success: false, message: "This roll number already registered" };
    }

    const isExistingEmail = await Student.findOne({ email });
    if (isExistingEmail) {
      return { success: false, message: "This email is already registered" };
    }

    const isExistingPhone = await Student.findOne({ phone });

    if (isExistingPhone) {
      return {
        success: false,
        message: "This phone number is already registered",
      };
    }

    // ✅ Upload image to Cloudinary
    let imageUrl = "";
    if (profilePic instanceof File) {
      const arrayBuffer = await profilePic.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "students",
              public_id: uuidv4(),
              resource_type: "image",
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          )
          .end(buffer);
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      imageUrl = (result as any).secure_url;
    }

    const newStudent = await Student.create({
      fullName,
      rollNumber,
      email,
      phone,
      parentPhone,
      totalFine: 0,
      profilePic: imageUrl,
    });

    console.log(newStudent);
    return {success: true, message: "Student registered successfully"}

  } catch (error: unknown) {
    if(error instanceof Error) {
        console.log(error.message)
    }else{
        console.log(error)
    }
    return {success: false, message: "Internal server error"}
  }
}
