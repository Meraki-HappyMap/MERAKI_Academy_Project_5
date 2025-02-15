import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Star } from "lucide-react";

const reviews = {
  success: true,
  data: [
    { id: 1, comment: "Great!", rate: 3, username: "Donna", avatar_url: "https://via.placeholder.com/50" },
    { id: 2, comment: "Nice stay", rate: 5, username: "Hope", avatar_url: "https://via.placeholder.com/50" },
    { id: 1, comment: "Great!", rate: 3, username: "Donna", avatar_url: "https://via.placeholder.com/50" },
    { id: 2, comment: "Nice stay", rate: 5, username: "Hope", avatar_url: "https://via.placeholder.com/50" },
  ],
};

function Reviews() {
  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold mb-4">Guest Reviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.data.map((review) => (
          <Card key={review.id} className="shadow-lg bg-white dark:bg-gray-800">
            <CardHeader>
              <div className="flex items-center mb-2">
                <img src={review.avatar_url} alt={review.username} className="w-10 h-10 rounded-full mr-3" />
                <h3 className="font-semibold dark:text-white">{review.username}</h3>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-yellow-500 mb-2">
                {[...Array(5)].map((_, index) => (
                  <Star key={index} className={`w-5 h-5 ${index < review.rate ? "fill-current" : "text-gray-400"}`} />
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
            </CardContent>
            <CardFooter>
              <p className="text-gray-400 text-sm mt-2">1 week ago</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Reviews;
