import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CloudUpload, Loader2 } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, FormEvent, MouseEvent, useRef, useState } from "react";
import { SaveStudent } from "../api/save-student";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function StudentRegistrationForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    parentPhone: "",
    address: "",
    rollNumber: "",
    profilePic: null as File | null,
  });

  const [preview, setPreview] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      if (file?.size > 2 * 1024 * 1024) {
        alert("File is too large. Max 2MB allowed");
        return;
      }
      setFormData((prev) => ({ ...prev, profilePic: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await SaveStudent(formData);

      if (response.success) {
        toast.success(response.message);
        router.push(`/profile-search/${formData.rollNumber}`);
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
    <form
      onSubmit={handleSubmit}
      className="space-y-4 w-xl mx-[15px] text-white"
    >
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
        Student <span className="text-amber-600">Registration</span>
      </h2>

      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          type="text"
          id="fullName"
          name="fullName"
          placeholder="eg: Aryan Gupta"
          value={formData.fullName}
          onChange={handleChange}
          className="placeholder:text-amber-500 font-bold"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Personal Email</Label>
        <Input
          type="email"
          id="email"
          name="email"
          placeholder="eg: aryangupta23@gmail.com"
          value={formData.email}
          onChange={handleChange}
          className="placeholder:text-amber-500 font-bold"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            type="tel"
            id="phone"
            name="phone"
            placeholder="eg: 4545456565"
            value={formData.phone}
            onChange={handleChange}
            className="placeholder:text-amber-500 font-bold"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="parentPhone">Parent&apos;s Phone Number</Label>
          <Input
            type="tel"
            id="parentPhone"
            name="parentPhone"
            placeholder="eg: 6565654545"
            value={formData.parentPhone}
            onChange={handleChange}
            className="placeholder:text-amber-500 font-bold"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Home Address</Label>
        <Textarea
          id="address"
          name="address"
          placeholder="eg: Hamirpur (H.P)"
          value={formData.address}
          onChange={handleChange}
          className="placeholder:text-amber-500 font-bold resize-none h-[70px]"
          required
        />
      </div>

      <div className="flex justify-between">
        <div className="space-y-2">
          <Label htmlFor="rollNumber">Roll Number</Label>
          <Input
            id="rollNumber"
            name="rollNumber"
            placeholder="eg: 23bce0**"
            value={formData.rollNumber}
            className="placeholder:text-amber-500 font-bold w-md"
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex flex-col items-center justify-between space-y-2">
          <Input
            type="file"
            id="profilePic"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <Label htmlFor="profilePic" className="space-y-2">
            Profile Picture
          </Label>

          {/* <Button onClick={handleButtonClick}>File Input</Button> */}
          {!preview && (
            <div
              className="h-[70px] w-[90px] border-3 border-dotted border-amber-600  rounded-lg flex items-center justify-center cursor-pointer hover:bg-black group"
              onClick={handleButtonClick}
            >
              <CloudUpload
                className="text-gray-600 group-hover:text-white"
                size={30}
              />
            </div>
          )}
          {preview && (
            <div
              className="cursor-pointer group relative"
              onClick={handleButtonClick}
            >
              <Image
                src={preview}
                alt="Profile Picture"
                width={100}
                height={100}
                className="rounded-lg border h-[70px] w-[90px]"
              />
              <div className="absolute inset-0 bg-black/40 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </div>
          )}
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <p className="flex items-center justify-center gap-3">
            {" "}
            <Loader2 className="animate-spin" /> Please wait...
          </p>
        ) : (
          <p>Submit Registartion</p>
        )}
      </Button>
    </form>
  );
}
