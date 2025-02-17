import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function BlockBooking() {
  return (
    <Card className="w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white">
          Block this place
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Label className="text-gray-600 dark:text-gray-300 text-sm">
            Block from
          </Label>
          <Input
            type="datetime-local"
            className="mt-1 bg-gray-200 dark:bg-gray-700"
          />
        </div>

        <div className="mb-4">
          <Label className="text-gray-600 dark:text-gray-300 text-sm">
            Block to
          </Label>
          <Input
            type="datetime-local"
            className="mt-1 bg-gray-200 dark:bg-gray-700"
          />
        </div>

        <Button className="w-full mt-4 bg-black hover:bg-slate-800 text-white">
          Block Now
        </Button>
      </CardContent>
    </Card>
  );
}

export default BlockBooking;
