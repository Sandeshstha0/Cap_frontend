import WelcomeAnimation from "@/Components/Animations/WelcomeAnimation";
import useFetchProtectedData from "@/hooks/useFetchProtectedData";
import React from "react";

interface UserData {
  data: {
    firstname: string;
    secondname: string;
  };
}

export default function Header() {
  const {
    data: protectedData,
    error: apiError,
    refetchData,
  } = useFetchProtectedData<UserData>("/user");

  return (
    <div className="bg-white rounded-lg flex">
       <div className="px-4">
        <WelcomeAnimation />
      </div>
      {/* Page Heading */}
      <div className="text-left text-primary font-normal px-4 py-6 md:px-10 md:py-8 lg:px-8 lg:py-10">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">
          Hello, {protectedData?.data?.firstname}{" "}
          {protectedData?.data?.secondname}!
        </h1>
        <p className="text-gray-600 text-sm md:text-base lg:text-lg">
          Welcome to the Budget Expert, where we help you manage your daily
          expenses and projects.
        </p>
      </div>
     
    </div>
  );
}
