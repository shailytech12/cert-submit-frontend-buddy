
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

export const CertificateFilters = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-6">
      <h1 className="text-2xl md:text-3xl font-bold">Certificate Management</h1>
      <div className="mt-4 md:mt-0 flex space-x-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input 
            type="search" 
            placeholder="Search certificates..." 
            className="pl-8 w-[200px] md:w-[300px]" 
          />
        </div>
        <Button asChild className="bg-maroon-700 hover:bg-maroon-800">
          <Link to="/certificates/upload">Upload New</Link>
        </Button>
      </div>
    </div>
  );
};
