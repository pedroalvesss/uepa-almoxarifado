"use client";
import CardDashboard from "./components/CardDashboard";

export default function Page() {
  return (
    <div className="flex flex-col justify-center items-center gap-4 p-4">
      <div className="mt-10">
        <CardDashboard />
      </div>
    </div>
  );
}
