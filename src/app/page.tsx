"use client";
import React, { ReactNode } from "react";
import {
  ArrowRightCircle,
  UserPlus,
  DoorOpen,
  DoorClosed,
  Search,
  Users,
} from "lucide-react";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header Section */}
      <div className="flex items-center justify-center p-6 sm:p-8 md:p-10 mt-4 sm:mt-8 md:mt-12 lg:mt-16">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-center">
          Your smart <span className="text-amber-600">gateway</span> to{" "}
          <span className="text-amber-600">campus</span> movement
        </h1>
      </div>

      {/* Navigation Buttons */}
      <div className="flex-1 flex flex-col items-center justify-center gap-6 max-w-md mx-auto w-full px-4">
        <NavButton
          icon={<UserPlus size={24} />}
          label="Registration"
          href="/registration"
        />

        <NavButton
          icon={<DoorOpen size={24} />}
          label="Entry Open"
          href="/entry/open"
        />

        <NavButton
          icon={<DoorClosed size={24} />}
          label="Entry Close"
          href="/entry/close"
        />

        <NavButton
          icon={<Search size={24} />}
          label="Profile Search"
          href="/profile-search"
        />

        <NavButton
          icon={<Users size={24} />}
          label="List of Outside Students"
          href="/outside-students"
        />
      </div>

      {/* Footer */}
      <div className="p-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Campus Gateway System
      </div>
    </div>
  );
};

// Navigation Button Component
const NavButton = ({ icon, label, href }: {label: string, href: string, icon: ReactNode}) => {
  return (
    <a
      href={href}
      className="flex items-center justify-between w-full bg-gray-900 hover:bg-gray-800 text-white p-4 rounded-lg transition-all duration-300 border border-gray-800 hover:border-amber-600 group"
    >
      <div className="flex items-center gap-3">
        <div className="text-amber-600">{icon}</div>
        <span className="text-lg font-medium">{label}</span>
      </div>
      <ArrowRightCircle
        size={20}
        className="text-gray-600 group-hover:text-amber-600 transition-colors duration-300"
      />
    </a>
  );
};

export default HomePage;
