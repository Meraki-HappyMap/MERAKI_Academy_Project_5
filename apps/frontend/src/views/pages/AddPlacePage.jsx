import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DollarSign, Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useToast } from "@/hooks/use-toast";
import placesApi from "@/services/places";
import { CATEGORY_URL_MAP } from "@/lib/constants/categories";

function AddPlacePage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    category_id: "",
    price: "",
    images: [],
    videos: [],
  });

  const allCategories = Object.entries(CATEGORY_URL_MAP).map(([name, id]) => ({
    id,
    name: name.charAt(0).toUpperCase() + name.slice(1),
  }));

  const createPlaceMutation = placesApi.useCreate({
    onSuccess: (response) => {
      console.log("Place creation response:", response);
      toast({
        title: "Success!",
        description: "Place added successfully.",
        variant: "success",
      });
      if (response?.data?.id) {
        navigate(`/places/${response.data.id}`);
      } else if (response?.id) {
        navigate(`/places/${response.id}`);
      } else {
        navigate("/oops");
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to add place. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      category_id: Number(value),
    }));
  };

  const handleFileChange = (e, type) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      [type]: [...prev[type], ...files],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name?.trim() ||
      !formData.description?.trim() ||
      !formData.location?.trim() ||
      !formData.category_id
    ) {
      toast({
        title: "Error",
        description:
          "All fields (name, description, category, location) are required.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const placeData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        location: formData.location.trim(),
        category_id: formData.category_id,
        price: formData.price || 0,
      };

      await createPlaceMutation.mutateAsync(placeData);

      if (formData.images.length > 0 || formData.videos.length > 0) {
        const mediaFormData = new FormData();

        formData.images.forEach((image) => {
          mediaFormData.append("images", image);
        });

        formData.videos.forEach((video) => {
          mediaFormData.append("videos", video);
        });

        // TODO: Add media upload endpoint call here
        // await uploadMediaMutation.mutateAsync({ placeId: result.data.id, mediaFormData });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to add place. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-start justify-center min-h-screen bg-gray-100 dark:bg-[#0B0F17] p-6">
      <Card className="w-full max-w-6xl flex flex-col md:flex-row gap-6 overflow-hidden transition-shadow hover:shadow-lg dark:hover:shadow-gray-800/20 dark:bg-[#151923] dark:border-gray-800">
        <CardContent className="w-full md:w-2/3 p-6">
          <CardHeader className="px-0">
            <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white">
              Add New Place
            </CardTitle>
          </CardHeader>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Place Name
              </label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter place name"
                className="transition-colors focus:border-rose-500 dark:focus:border-rose-400 dark:bg-[#1C2130] dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Description
              </label>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter place description"
                className="min-h-[120px] transition-colors focus:border-rose-500 dark:focus:border-rose-400 dark:bg-[#1C2130] dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Location
              </label>
              <Input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Enter location"
                className="transition-colors focus:border-rose-500 dark:focus:border-rose-400 dark:bg-[#1C2130] dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Category
              </label>
              <Select
                value={
                  formData.category_id ? formData.category_id.toString() : ""
                }
                onValueChange={handleCategoryChange}
                required
              >
                <SelectTrigger className="transition-colors focus:border-rose-500 dark:focus:border-rose-400 dark:bg-[#1C2130] dark:border-gray-700 dark:text-gray-100">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent className="dark:bg-[#1C2130] dark:border-gray-700">
                  {allCategories.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id.toString()}
                      className="cursor-pointer hover:bg-rose-50 dark:hover:bg-rose-500/10 dark:text-gray-100 dark:focus:bg-rose-500/10"
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Price (JOD)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                <Input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  className="pl-10 transition-colors focus:border-rose-500 dark:focus:border-rose-400 dark:bg-[#1C2130] dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
                  required
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Enter the price per hour/day in Jordanian Dinar
              </p>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-rose-500 hover:bg-rose-600 dark:bg-rose-500 dark:hover:bg-rose-600 text-white dark:text-white"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding Place...
                </>
              ) : (
                "Add Place"
              )}
            </Button>
          </form>
        </CardContent>

        <CardContent className="w-full md:w-1/3 p-6 bg-gray-50 dark:bg-[#1A1F2C] rounded-none md:rounded-r-lg space-y-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Upload Images
              </label>
              <div className="relative overflow-hidden rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 p-4 transition-colors hover:border-rose-500 dark:hover:border-rose-400 dark:bg-[#1C2130]">
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleFileChange(e, "images")}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {formData.images.length > 0
                      ? `${formData.images.length} images selected`
                      : "Drag and drop your images here, or click to select"}
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Upload Videos
              </label>
              <div className="relative overflow-hidden rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 p-4 transition-colors hover:border-rose-500 dark:hover:border-rose-400 dark:bg-[#1C2130]">
                <Input
                  type="file"
                  accept="video/*"
                  multiple
                  onChange={(e) => handleFileChange(e, "videos")}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {formData.videos.length > 0
                      ? `${formData.videos.length} videos selected`
                      : "Drag and drop your videos here, or click to select"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AddPlacePage;
