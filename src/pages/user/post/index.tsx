import DefaultLayout from "@/Components/globalComponent/Admin/Layouts/DefaultLayout";
import React from "react";

export default function index() {
  return (
    <DefaultLayout>
    <div>
      <div>
        {/* Page Heading */}
        <div className="bg-white text-left text-primary font-normal  px-15 py-6 ">
          <b>Hello, Sandesh!</b>
          <p>
            Welcome to the Budget Expert, here we manage you daily Expense and
            Projects
          </p>
         </div>
         
      </div>
    </div>
    </DefaultLayout>
    
  );
}
