import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";

function CalenderBooking() {
  return (
    <Card className="w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white">
          Select Time
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Calendar mode="single" className="mt-1 border rounded-lg p-4" />
        </div>
      </CardContent>
    </Card>
  );
}

export default CalenderBooking;
