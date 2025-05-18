import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar1, Loader2 } from "lucide-react";
import { FormEvent, useState } from "react";
import { PermitSave } from "../api/permit-save";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const places = [
  {
    id: "market",
    label: "Market",
  },
  {
    id: "home",
    label: "Home",
  },
  {
    id: "hospital",
    label: "Hospital",
  },
  {
    id: "trip",
    label: "Trip",
  },
];

export const StudentEntryOpen = () => {
  const [selectedPlace, setSelectedPlace] = useState("market");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [rollNumber, setRollNumber] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formData = {
    inTime: date,
    outFor: selectedPlace,
    rollNumber,
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    try {
      setIsLoading(true);
      const response = await PermitSave(formData);
      if (response.success) {
        toast.success(response.message);
        router.push("/")
      } else {
        toast.error(response.message);
      }
    } catch (error: unknown) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="space-y-4 text-white">
      <h1 className="text-4xl font-bold">
        Student <span className="text-amber-500">Entry Open</span> Before Move
      </h1>

      <div className="space-y-2">
        <h1>Enter your Roll Number</h1>
        <Input
          type="text"
          id="rollNumber"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <h1>When you come ?</h1>
        <Popover>
          <PopoverTrigger asChild>
            <Button className="bg-amber-600 hover:bg-amber-700">
              <Calendar1 />
              {date ? <span>{date.toDateString()}</span> : <p>Pick the Date</p>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="space-y-2">
        <h1>Where to go?</h1>
        <RadioGroup
          value={selectedPlace}
          onValueChange={(value) => setSelectedPlace(value)}
          className="grid grid-rows-2 md:grid-cols-2 gap-4"
        >
          {places.map((place) => (
            <div key={place.id} className="flex items-center gap-4">
              <RadioGroupItem value={place.id} id={place.id} />
              <Label htmlFor={place.id}>{place.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="bg-amber-600 w-full mt-3 hover:bg-amber-700"
      >
        {isLoading ? (
          <p className="flex items-center justify-center gap-2">
            <Loader2 className="animate-spin" />
            Please wait
          </p>
        ) : (
          "Submit"
        )}
      </Button>
    </form>
  );
};
