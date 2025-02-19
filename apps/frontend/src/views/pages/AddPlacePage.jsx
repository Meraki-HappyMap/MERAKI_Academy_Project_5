import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

function AddPlacePage() {
  const allCategories = [
    { id: 1, name: "PlayStation", is_deleted: 0 },
    { id: 2, name: "Farm", is_deleted: 0 },
    { id: 8, name: "Gaming", is_deleted: 0 }
  ];

  return (
    <div className="flex items-start justify-center min-h-screen bg-gray-100 p-6">
      <Card className="w-full max-w-6xl flex flex-row gap-6"> 
        <CardContent className="w-2/3 p-6">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Add New Place</CardTitle>
          </CardHeader>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Place Name</label>
              <Input type="text" placeholder="Enter place name" required />
            </div>
            
            <div>
              <label className="block text-sm font-medium">Description</label>
              <Textarea placeholder="Enter place description" required />
            </div>
            
            <div>
              <label className="block text-sm font-medium">Location</label>
              <Input type="text" placeholder="Enter location" required />
            </div>
            
            <div>
              <label className="block text-sm font-medium">Category</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {allCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id.toString()}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button type="submit" className="w-full">Add</Button>
          </form>
        </CardContent>
        
        <CardContent className="w-1/3 p-6 bg-gray-50 rounded-r-lg">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Upload Images</label>
              <Input type="file" accept="image/*" multiple />
            </div>
            <div>
              <label className="block text-sm font-medium">Upload Videos</label>
              <Input type="file" accept="video/*" multiple />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AddPlacePage;
