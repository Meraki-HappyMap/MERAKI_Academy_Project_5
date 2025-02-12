import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@/components/ui/card";
import { Star } from "lucide-react";

const reviews = {
  success: true,
  message: "Reviews fetched successfully.",
  data: [
    {
      id: 1,
      comment: "Fantastic accommodation. Just what we were looking for...",
      rate: 5,
      created_at: "1 week ago",
      user_id: 1,
      username: "Donna",
      avatar_url: "https://via.placeholder.com/50",
    },
    {
      id: 2,
      comment: "Such a lovely villa and great location...",
      rate: 5,
      created_at: "January 2025",
      user_id: 2,
      username: "Hope",
      avatar_url: "https://via.placeholder.com/50",
    },
    {
      id: 3,
      comment: "Awesome clean bright property...",
      rate: 5,
      created_at: "November 2024",
      user_id: 3,
      username: "Sarah",
      avatar_url: "https://via.placeholder.com/50",
    },
    {
      id: 4,
      comment: "We had a great stay at Panagiotis’s place...",
      rate: 4,
      created_at: "November 2024",
      user_id: 4,
      username: "Maciej",
      avatar_url: "https://via.placeholder.com/50",
    },
  ],
};

function Reviews() {
  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold mb-4">Guest Reviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.data.map((review) => (
          <Card key={review.id} className="shadow-lg">
            <CardHeader>
              <div className="flex items-center mb-2">
                <img
                  src={review.avatar_url}
                  alt={review.username}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <h3 className="font-semibold">{review.username}</h3>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <div className="flex items-center text-yellow-500 mb-2">
                {Array.from({ length: review.rate }).map((_, index) => (
                  <Star key={index} className="w-5 h-5" />
                ))}
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </CardBody>
            <CardFooter>
              <p className="text-gray-400 text-sm mt-2">{review.created_at}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Reviews;
