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

function AddPlacePage() {
  const allCategories = [
    { id: 1, name: "PlayStation", is_deleted: 0 },
    { id: 2, name: "Farm", is_deleted: 0 },
    { id: 8, name: "Gaming", is_deleted: 0 },
  ];

  return (
    <div className="flex items-start justify-center min-h-screen bg-gray-100 dark:bg-[#0B0F17] p-6">
      <Card className="w-full max-w-6xl flex flex-col md:flex-row gap-6 overflow-hidden transition-shadow hover:shadow-lg dark:hover:shadow-gray-800/20 dark:bg-[#151923] dark:border-gray-800">
        <CardContent className="w-full md:w-2/3 p-6">
          <CardHeader className="px-0">
            <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white">
              Add New Place
            </CardTitle>
          </CardHeader>
          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Place Name
              </label>
              <Input
                type="text"
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
                placeholder="Enter location"
                className="transition-colors focus:border-rose-500 dark:focus:border-rose-400 dark:bg-[#1C2130] dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Category
              </label>
              <Select>
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

            <Button
              type="submit"
              className="w-full bg-rose-500 hover:bg-rose-600 dark:bg-rose-500 dark:hover:bg-rose-600 text-white dark:text-white"
            >
              Add Place
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
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Drag and drop your images here, or click to select
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
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Drag and drop your videos here, or click to select
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
