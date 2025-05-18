import { StudentDetail } from "../api/student-detail";
import { useEffect, useState } from "react";
import mongoose from "mongoose";

import React from "react";
import { formatDistance } from "date-fns";
import {
  UserCircle,
  Clock,
  CalendarDays,
  Phone,
  Mail,
  Tag,
  DollarSign,
  MapPin,
  ArrowLeft,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface IStudent {
  fullName: string;
  email: string;
  rollNumber: string;
  phone: string;
  parentPhone: string;
  profilePic: string;
  totalFine: number;
  createdAt: Date;
  updatedAt: Date;
}

interface IInOut {
  student: mongoose.Schema.Types.ObjectId;
  outFor: string;
  outTime: Date;
  inTime: Date;
  whereNow: string;
  fine: number;
  createdAt: Date;
  updatedAt: Date;
}

export function StudentProfile({ rollNumber }: { rollNumber: string }) {
  const [studentDetails, setStudentDetails] = useState<IStudent | null>(null);
  const [studentPermissions, setStudentPermissions] =
    useState<Array<IInOut> | null>(null);
  const router = useRouter();
  useEffect(() => {
    const handleStudentSearchProfile = async () => {
      try {
        const response = await StudentDetail(rollNumber);
        if (response.success) {
          setStudentDetails(response.detail);
          if (response.permissions) {
            setStudentPermissions(response.permissions);
          }
        }
      } catch (error: unknown) {
        console.log(error);
        return { success: false, message: "Internal functional error" };
      } finally {
      }
    };

    handleStudentSearchProfile();
  }, [rollNumber]);

  // Format date for display
  const formatDate = (dateString: Date | string | undefined) => {
    if (!dateString) return "N/A";

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid date";

    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Calculate duration between dates
  const getDuration = (outTime: Date, inTime: Date) => {
    const out = new Date(outTime);
    const inn = new Date(inTime);
    return formatDistance(inn, out, { addSuffix: false });
  };

  function getMarketDuration(start: Date | string, end: Date | string): string {
    const startDate = new Date(start);
    const endDate = new Date(end);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return "Invalid time";
    }

    const diffMs = endDate.getTime() - startDate.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${diffHours}h ${diffMinutes}m`;
  }
  

  return (
    <div className="bg-black min-h-screen text-white p-6">
      {/* Profile Card */}
      <div className="max-w-4xl mx-auto bg-gray-900 rounded-lg overflow-hidden shadow-xl">
        {/* Header */}
        <div className="bg-amber-600 p-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="flex-shrink-0 mb-4 md:mb-0">
              {studentDetails?.profilePic ? (
                <Image
                  src={studentDetails?.profilePic}
                  alt={studentDetails?.fullName}
                  height={200}
                  width={200}
                  className="h-32 w-32 rounded-full border-4 border-white"
                />
              ) : (
                <div className="h-32 w-32 rounded-full border-4 border-white bg-gray-800 flex items-center justify-center">
                  <UserCircle size={80} className="text-gray-400" />
                </div>
              )}
            </div>
            <div className="md:ml-6 text-center md:text-left">
              <h1 className="text-3xl font-bold">{studentDetails?.fullName}</h1>
              <p className="text-amber-200 mt-1 flex items-center justify-center md:justify-start">
                <Tag size={16} className="mr-2" /> {studentDetails?.rollNumber}
              </p>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="text-amber-600 mr-3" size={20} />
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <p>{studentDetails?.email}</p>
                </div>
              </div>

              <div className="flex items-center">
                <Phone className="text-amber-600 mr-3" size={20} />
                <div>
                  <p className="text-gray-400 text-sm">Phone</p>
                  <p>{studentDetails?.phone}</p>
                </div>
              </div>

              <div className="flex items-center">
                <Phone className="text-amber-600 mr-3" size={20} />
                <div>
                  <p className="text-gray-400 text-sm">Parent&apos;s Phone</p>
                  <p>{studentDetails?.parentPhone}</p>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div className="flex items-center">
                <DollarSign className="text-amber-600 mr-3" size={20} />
                <div>
                  <p className="text-gray-400 text-sm">Total Fine</p>
                  <p className="text-red-500 font-semibold">
                    ₹{studentDetails?.totalFine.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <CalendarDays className="text-amber-600 mr-3" size={20} />
                <div>
                  <p className="text-gray-400 text-sm">Registered On</p>
                  <p>{formatDate(studentDetails?.createdAt)}</p>
                </div>
              </div>

              <div className="flex items-center">
                <Clock className="text-amber-600 mr-3" size={20} />
                <div>
                  <p className="text-gray-400 text-sm">Last Updated</p>
                  <p>{formatDate(studentDetails?.updatedAt)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Permissions Table */}
      <div className="max-w-4xl mx-auto mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-amber-600 flex items-center justify-between">
          Permission History
          <Button onClick={() => router.push("/")} className="bg-amber-600 hover:bg-amber-500">
            <ArrowLeft/>
            Go To Home{" "}
          </Button>
        </h2>

        <div className="bg-gray-900 rounded-lg overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full table-fixed">
              <thead className="bg-amber-600 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">Purpose</th>
                  <th className="py-3 px-4 text-left">Out Time</th>
                  <th className="py-3 px-4 text-left">In Time</th>
                  <th className="py-3 px-4 text-left">Duration</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Fine (₹)</th>
                </tr>
              </thead>
            </table>
            <div className="max-h-80 overflow-y-auto">
              <table className="w-full table-fixed">
                <tbody className="divide-y divide-gray-800">
                  {studentPermissions?.map((permission, index) => (
                    <tr key={index} className="hover:bg-gray-800">
                      <td className="py-3 px-4 capitalize">
                        <div className="flex items-center">
                          <MapPin size={16} className="text-amber-600 mr-2" />
                          {permission.outFor}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        {formatDate(permission.outTime)}
                      </td>
                      <td className="py-3 px-4">
                        {formatDate(permission.inTime)}
                      </td>
                      <td className="py-3 px-4">
                        {permission.outFor !== "market"
                          ? getDuration(permission.outTime, permission.inTime)
                          : getMarketDuration(
                              permission.outTime,
                              (() => {
                                const inTime = new Date(permission.outTime);
                                inTime.setHours(21, 0, 0, 0); // 9:00 PM
                                return inTime;
                              })()
                            )}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            permission.whereNow === "inside"
                              ? "bg-green-900 text-green-300"
                              : "bg-red-900 text-red-300"
                          }`}
                        >
                          {permission.whereNow}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-red-500 font-medium">
                        ₹{permission.fine.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary */}
          <div className="p-4 bg-gray-800 border-t border-gray-700">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-gray-400">Total Permissions:</span>
                <span className="ml-2 font-medium">
                  {studentPermissions?.length}
                </span>
              </div>
              <div>
                <span className="text-gray-400">Total Fine:</span>
                <span className="ml-2 font-medium text-red-500">
                  ₹{studentDetails?.totalFine.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
