import Image from "next/image";
import React from "react";
import Header from "./Header";
import TotalBudget from "./TotalBudget";
import OverView from "./OverView";

export default function UserDashboard() {
  return (
    <div>
    <Header/>
     <TotalBudget/>
     <OverView/>
    </div>
  );
}
