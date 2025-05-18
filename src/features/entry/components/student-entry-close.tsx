import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { MouseEvent, useState } from "react";
import { EntryClose } from "../api/entry-close";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export const StudentEntryClose = () => {
  const [rollNumber, setRollNumber] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const handleEntryClosed = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(rollNumber);
    setIsLoading(true);
    try {
      const response = await EntryClose(rollNumber);

      if (response?.success) {
        router.push("/")
        toast.success(response.message);
      } else {
        toast.error(response?.message);
      }
    } catch (error: unknown) {
      console.log(error);
      toast.error("Internal server error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="text-white space-y-7 md:space-y-10 mt-48 mx-5">
      <h1 className="text-2xl sm:text-4xl md:text-5xl text-center font-bold">
        Student <span className="text-amber-600">Entry Close</span> Before Move
      </h1>
      <div className="flex items-center justify-center gap-5">
        <Label
          htmlFor="rollNumber"
          className="text-lg sm:text-xl md:text-2xl w-[250px] md:w-[300px] bg-amber-600 rounded-lg flex items-center justify-center py-1 md:py-2"
        >
          Roll Number
        </Label>

        <Input
          id="rollNumber"
          name="rollNumber"
          type="text"
          placeholder="Enter your roll number"
          onChange={(e) => setRollNumber(e.target.value)}
          style={{ fontSize: "24px" }}
          className="h-9 md:h-12 placeholder:text-white placeholder:text-lg md:font-bold text-xl text-center pb-3"
        />
      </div>
      <div className="flex items-center justify-center">
        <Button
          className="w-[200px] md:w-[300px] border-3 border-amber-600 bg-transparent text-lg md:text-2xl py-3 md:py-5"
          onClick={handleEntryClosed}
        >
          {isLoading ? (
            <p className="flex items-center justify-center gap-2">
              <Loader2 className="animate-spin" />
              Please wait
            </p>
          ) : (
            "Entry Closed"
          )}
        </Button>
      </div>
    </div>
  );
};
