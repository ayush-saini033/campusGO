import { useEffect, useState } from "react";
import { outsideDetail } from "../api/outsideDetail";
import Image from "next/image";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface OutsideStudentDetail {
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

interface OutsideStudentPermission {
  student: OutsideStudentDetail;
  outFor: string;
  outTime: Date;
  inTime: Date | null;
  whereNow: string;
  fine: number;
  createdAt: Date;
  updatedAt: Date;
}

export function OutsideStudents() {
  const [students, setStudents] = useState<
    Array<OutsideStudentPermission> | undefined
  >(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function outsideStudentsDetail() {
      try {
        setLoading(true);
        const response = await outsideDetail();
        if (response.success) {
          setStudents(response?.outsideData);
        } else {
          setError("Failed to fetch outside students data");
        }
      } catch (err) {
        setError("An error occurred while fetching data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    outsideStudentsDetail();
  }, []);

  // Format date function
  const formatDateTime = (date: Date | null | undefined) => {
    if (!date) return "N/A";
    return format(new Date(date), "MMM dd, yyyy - h:mm a");
  };

  return (
    <div className="mt-20 px-4 md:px-6 lg:px-8 text-white">
      <h1 className="text-2xl sm:text-3xl lg:text-5xl md:text-4xl font-bold text-center text-white mb-8">
        <span className="text-amber-600">Outside</span> Students Detail
      </h1>

      <Button className="bg-amber-600 hover:bg-amber-500 mb-2" onClick={() => router.push("/")}><ArrowLeft/> Go To Home</Button>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="w-10 h-10 border-4 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center py-8">{error}</div>
      ) : !students || students.length === 0 ? (
        <div className="bg-black/40 text-center py-12 rounded-lg border border-amber-600/30">
          <p className="text-xl text-amber-600">
            No students are currently outside
          </p>
        </div>
      ) : (
        <>
          {/* Mobile view - Cards for small screens */}
          <div className="md:hidden grid grid-cols-1 gap-4 mb-6">
            {students.map((item, index) => (
              <div
                key={index}
                className="bg-black border border-amber-600/50 rounded-lg p-4"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-amber-600">
                    {item.student?.profilePic.trim() ? (
                      <Image
                        src={item.student.profilePic}
                        alt={item.student.fullName}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-amber-100 text-amber-700 font-semibold text-xl uppercase">
                        {item.student?.fullName?.charAt(0) || "?"}
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="text-white font-semibold">
                      {item.student.fullName}
                    </h3>
                    <p className="text-amber-600 text-sm">
                      {item.student.rollNumber}
                    </p>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex justify-between">
                    <span className="text-amber-600">Out For:</span>
                    <span className="capitalize">{item.outFor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-amber-600">Out Time:</span>
                    <span>{formatDateTime(item.outTime)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-amber-600">In Time:</span>
                    <span>{formatDateTime(item.inTime)}</span>
                  </div>
                  {item.fine > 0 && (
                    <div className="flex justify-between text-red-500">
                      <span>Fine:</span>
                      <span>₹{item.fine}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Desktop view - Table for medium and larger screens */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-amber-600 text-black">
                  <th className="py-3 px-4 text-left font-semibold rounded-tl-lg">
                    Profile
                  </th>
                  <th className="py-3 px-4 text-left font-semibold">Name</th>
                  <th className="py-3 px-4 text-left font-semibold">
                    Roll Number
                  </th>
                  <th className="py-3 px-4 text-left font-semibold">Out For</th>
                  <th className="py-3 px-4 text-left font-semibold">
                    Out Time
                  </th>
                  <th className="py-3 px-4 text-left font-semibold">In Time</th>
                  <th className="py-3 px-4 text-left font-semibold rounded-tr-lg">
                    Fine
                  </th>
                </tr>
              </thead>
              <tbody>
                {students.map((item, index) => (
                  <tr
                    key={index}
                    className={`
                      border-b border-amber-600/30 hover:bg-amber-600/10 transition-colors
                      ${index === students.length - 1 ? "border-b-0" : ""}
                    `}
                  >
                    <td className="py-3 px-4">
                      <div className="relative h-12 w-12 rounded-full overflow-hidden border border-amber-600">
                        {item.student?.profilePic ? (
                          <Image
                            src={
                              item.student.profilePic ||
                              "/placeholder-avatar.png"
                            }
                            alt={item.student.fullName}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-amber-100 text-amber-700 font-semibold text-xl uppercase">
                            {item.student?.fullName?.charAt(0) || "?"}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-medium text-white">
                      {item.student.fullName}
                    </td>
                    <td className="py-3 px-4 text-amber-600">
                      {item.student.rollNumber}
                    </td>
                    <td className="py-3 px-4 capitalize">{item.outFor}</td>
                    <td className="py-3 px-4">
                      {formatDateTime(item.outTime)}
                    </td>
                    <td className="py-3 px-4">{formatDateTime(item.inTime)}</td>
                    <td className="py-3 px-4">
                      {item.fine > 0 ? (
                        <span className="text-red-500">₹{item.fine}</span>
                      ) : (
                        <span className="text-green-500">No Fine</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
