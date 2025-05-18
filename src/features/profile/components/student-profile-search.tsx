import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";

export function StudentProfileSearch() {
  const [rollNumber, setRollNumber] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleStudentSearchProfile = async () => {
    setIsLoading(true);
    try {
      router.push(`/profile-search/${rollNumber}`);
    } catch (error: unknown) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="text-white mt-48 space-y-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mx-2">
        Search <span className="text-amber-600">your profile</span> by roll
        number
      </h1>
      <div className="flex items-center justify-center gap-3 md:gap-5 mx-2">
        <Label
          htmlFor="rollNumber"
          className="sm:text-sm md:text-lg bg-amber-600 rounded-sm md:rounded-lg py-2 w-[200px] flex items-center justify-center font-bold"
        >
          Roll Number
        </Label>
        <Input
          placeholder="eg: 23bce0**"
          id="rollNumber"
          name="rollNumber"
          type="text"
          style={{ fontSize: "16px" }}
          className="placeholder:text-amber-500 placeholder:font-bold font-bold text-center"
          onChange={(e) => setRollNumber(e.target.value)}
        />
      </div>
      <Button
        onClick={handleStudentSearchProfile}
        style={{ fontSize: "18px" }}
        className="w-full border-2 border-amber-600 bg-transparent"
      >
        {isLoading ? (
          <p className="flex items-center justify-center gap-3">
            <Loader2Icon className="animate-spin" />
            Please wait
          </p>
        ) : (
          "Show Profile"
        )}
      </Button>
    </div>
  );
}
