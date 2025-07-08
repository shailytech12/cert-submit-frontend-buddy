
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Building, Clock, Calendar, Phone } from "lucide-react";
import { LocationMap } from "@/components/LocationMap";
import { jntuhLocations } from "@/data/jntuhLocations";
import { useState } from "react";

const Locations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Filter locations based on search term
  const filteredLocations = jntuhLocations.filter(location =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.building.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.certificates.some(cert => cert.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">JNTUH Certificate Submission Locations</h1>
              <p className="text-muted-foreground mt-1">Official locations for certificate submission at Jawaharlal Nehru Technological University Hyderabad</p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input 
                  type="search" 
                  placeholder="Search locations or certificates..." 
                  className="pl-8 w-[300px]" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          <Tabs defaultValue="list" className="mb-8">
            <TabsList>
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="map">Interactive Map</TabsTrigger>
            </TabsList>
            
            <TabsContent value="list" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredLocations.map(location => (
                  <Card key={location.id} className="overflow-hidden">
                    <div className="h-40 overflow-hidden">
                      <img 
                        src={location.image} 
                        alt={location.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{location.name}</CardTitle>
                          <CardDescription className="flex items-center mt-1">
                            <Building className="h-4 w-4 mr-1" /> 
                            {location.building}, {location.floor}, Room {location.room}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-4">
                          <div className="flex items-start">
                            <Clock className="h-4 w-4 mr-2 mt-0.5 text-gray-500" />
                            <div>
                              <p className="text-sm font-medium">Office Hours</p>
                              <p className="text-xs text-muted-foreground">{location.hours}</p>
                              <p className="text-xs text-muted-foreground">{location.days}</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <Phone className="h-4 w-4 mr-2 mt-0.5 text-gray-500" />
                            <div>
                              <p className="text-sm font-medium">Contact</p>
                              <p className="text-xs text-muted-foreground">{location.contact}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium mb-2">Certificates Handled</p>
                          <div className="flex flex-wrap gap-2">
                            {location.certificates.map((cert, idx) => (
                              <span 
                                key={idx}
                                className="px-2 py-1 bg-maroon-100 text-maroon-800 rounded-full text-xs"
                              >
                                {cert}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="flex items-center"
                            onClick={() => setSelectedLocation(location)}
                          >
                            <MapPin className="h-3 w-3 mr-1" />
                            <span>View on Map</span>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="map" className="mt-6">
              <LocationMap 
                locations={jntuhLocations} 
                selectedLocation={selectedLocation}
                onLocationSelect={setSelectedLocation}
              />
            </TabsContent>
          </Tabs>
          
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>JNTUH Certificate Submission Guidelines</CardTitle>
              <CardDescription>
                Important information for submitting certificates at JNTUH
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">General Working Hours</h3>
                  <p className="text-sm text-muted-foreground">
                    Most offices are open from 9:00 AM to 5:00 PM, Monday through Friday. Some offices have extended hours on Saturdays. Always verify specific timings before visiting.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Required Documents</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    When visiting any JNTUH office, ensure you carry:
                  </p>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground">
                    <li>Original documents and photocopies</li>
                    <li>Valid student ID card or Hall Ticket</li>
                    <li>Fee payment receipt (varies by certificate type)</li>
                    <li>Filled application form (download from JNTUH website)</li>
                    <li>No Dues Certificate (where applicable)</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Important Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium">Main University Office:</p>
                      <p className="text-muted-foreground">+91 40 2304 2000</p>
                    </div>
                    <div>
                      <p className="font-medium">Student Helpline:</p>
                      <p className="text-muted-foreground">+91 40 2304 2222</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Online Services</h3>
                  <p className="text-sm text-muted-foreground">
                    Many certificates can be applied for online through the JNTUH official portal. Visit jntuh.ac.in for online application forms and fee payment options.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Locations;
