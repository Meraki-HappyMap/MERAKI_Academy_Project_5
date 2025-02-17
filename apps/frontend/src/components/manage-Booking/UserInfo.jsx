import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const userData = {
  avatarUrl: "https://via.placeholder.com/100",
  username: "Saleh Alrawajfa",
};

function UserInfo({ booking }) {
  return (
    <Card key={booking.id} className="shadow-lg rounded-xl p-4 border border-gray-200">
      <CardHeader className="flex items-center space-x-4">
        <img
          src={userData.avatarUrl}
          alt="User Avatar"
          className="w-12 h-12 rounded-full border border-gray-300"
        />
        <div>
          <CardTitle className="text-lg font-semibold">{userData.username}</CardTitle>
          <p className="text-sm text-gray-500">@{booking.booked_by}</p>
        </div>
      </CardHeader>
      <CardContent className="mt-2">
        <p className="text-gray-700">
          <span className="font-semibold">Start:</span> {new Date(booking.start_time).toLocaleString()}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">End:</span> {new Date(booking.end_time).toLocaleString()}
        </p>
        <div className="mt-4 flex justify-between">
          <Button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">Accept</Button>
          <Button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">Reject</Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default UserInfo;
