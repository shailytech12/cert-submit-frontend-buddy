
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Check, CheckCircle, Clock, AlertTriangle, Search, Calendar, Download } from "lucide-react";
import { Link } from "react-router-dom";

const Certificates = () => {
  // Mock data for certificates
  const certificates = [
    { 
      id: 1, 
      name: "Bonafide Certificate", 
      status: "Completed", 
      dueDate: "Submitted on Apr 10, 2025", 
      priority: "low",
      description: "A certificate that confirms your status as a bonafide student of the university.",
      submissions: [
        { date: "Apr 10, 2025", office: "Academic Section", status: "Approved" }
      ]
    },
    { 
      id: 2, 
      name: "Examination Fee Receipt", 
      status: "Pending", 
      dueDate: "Apr 30, 2025", 
      priority: "high",
      description: "Proof of payment for examination fees for the current semester.",
      submissions: []
    },
    { 
      id: 3, 
      name: "Course Completion Certificate", 
      status: "In Progress", 
      dueDate: "May 15, 2025", 
      priority: "medium",
      description: "Certifies that you have completed all required courses for your degree program.",
      submissions: [
        { date: "Apr 15, 2025", office: "Examination Department", status: "Under Review" }
      ]
    },
    { 
      id: 4, 
      name: "Academic Transcript", 
      status: "Not Started", 
      dueDate: "Jun 10, 2025", 
      priority: "medium",
      description: "Official record of your academic performance including grades and credits earned.",
      submissions: []
    },
    { 
      id: 5, 
      name: "No Dues Certificate", 
      status: "Not Started", 
      dueDate: "Jun 15, 2025", 
      priority: "low",
      description: "Certifies that you have no outstanding dues with the university.",
      submissions: []
    },
    { 
      id: 6, 
      name: "Character Certificate", 
      status: "Not Started", 
      dueDate: "Jun 20, 2025", 
      priority: "low",
      description: "Attests to your character and conduct during your time at the university.",
      submissions: []
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
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

          <Tabs defaultValue="all" className="mb-8">
            <TabsList>
              <TabsTrigger value="all">All Certificates</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming Deadlines</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificates.map(certificate => (
                  <Card key={certificate.id} className="overflow-hidden">
                    <div className={`h-2 w-full 
                      ${certificate.status === "Completed" ? "bg-green-500" : 
                        certificate.status === "In Progress" ? "bg-blue-500" : 
                        certificate.priority === "high" ? "bg-red-500" : 
                        "bg-gray-300"}`
                    } />
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{certificate.name}</CardTitle>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium
                          ${certificate.status === "Completed" ? "bg-green-100 text-green-800" : 
                            certificate.status === "In Progress" ? "bg-blue-100 text-blue-800" : 
                            certificate.priority === "high" ? "bg-red-100 text-red-800" : 
                            "bg-gray-100 text-gray-800"}`
                        }>
                          {certificate.status}
                        </div>
                      </div>
                      <CardDescription>
                        {certificate.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center text-sm">
                          <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                          <span className="text-muted-foreground">{certificate.dueDate}</span>
                        </div>
                        
                        {certificate.status === "Completed" ? (
                          <div className="flex justify-between items-center">
                            <div className="flex items-center text-sm text-green-600">
                              <Check className="h-4 w-4 mr-1" />
                              <span>Approved</span>
                            </div>
                            <Button variant="outline" size="sm" className="flex items-center">
                              <Download className="h-3 w-3 mr-1" />
                              <span>Download</span>
                            </Button>
                          </div>
                        ) : (
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">
                              {certificate.submissions.length > 0 ? 
                                `Last update: ${certificate.submissions[0].date}` : 
                                "No submissions yet"}
                            </span>
                            <Button asChild variant="secondary" size="sm">
                              <Link to={`/certificates/${certificate.id}`}>
                                View Details
                              </Link>
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="pending" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificates
                  .filter(cert => cert.status === "Pending" || cert.status === "Not Started" || cert.status === "In Progress")
                  .map(certificate => (
                    <Card key={certificate.id} className="overflow-hidden">
                      <div className={`h-2 w-full 
                        ${certificate.status === "In Progress" ? "bg-blue-500" : 
                          certificate.priority === "high" ? "bg-red-500" : 
                          "bg-gray-300"}`
                      } />
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{certificate.name}</CardTitle>
                          <div className={`px-2 py-1 rounded-full text-xs font-medium
                            ${certificate.status === "In Progress" ? "bg-blue-100 text-blue-800" : 
                              certificate.priority === "high" ? "bg-red-100 text-red-800" : 
                              "bg-gray-100 text-gray-800"}`
                          }>
                            {certificate.status}
                          </div>
                        </div>
                        <CardDescription>
                          {certificate.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center text-sm">
                            <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                            <span className="text-muted-foreground">{certificate.dueDate}</span>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">
                              {certificate.submissions.length > 0 ? 
                                `Last update: ${certificate.submissions[0].date}` : 
                                "No submissions yet"}
                            </span>
                            <Button asChild variant="secondary" size="sm">
                              <Link to={`/certificates/${certificate.id}`}>
                                View Details
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="completed" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificates
                  .filter(cert => cert.status === "Completed")
                  .map(certificate => (
                    <Card key={certificate.id} className="overflow-hidden">
                      <div className="h-2 w-full bg-green-500" />
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{certificate.name}</CardTitle>
                          <div className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {certificate.status}
                          </div>
                        </div>
                        <CardDescription>
                          {certificate.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center text-sm">
                            <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                            <span className="text-muted-foreground">{certificate.dueDate}</span>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <div className="flex items-center text-sm text-green-600">
                              <Check className="h-4 w-4 mr-1" />
                              <span>Approved</span>
                            </div>
                            <Button variant="outline" size="sm" className="flex items-center">
                              <Download className="h-3 w-3 mr-1" />
                              <span>Download</span>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="upcoming" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificates
                  .filter(cert => cert.status !== "Completed")
                  .sort((a, b) => new Date(a.dueDate.split(" ")[2]).getTime() - new Date(b.dueDate.split(" ")[2]).getTime())
                  .map(certificate => (
                    <Card key={certificate.id} className="overflow-hidden">
                      <div className={`h-2 w-full 
                        ${certificate.status === "In Progress" ? "bg-blue-500" : 
                          certificate.priority === "high" ? "bg-red-500" : 
                          "bg-gray-300"}`
                      } />
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{certificate.name}</CardTitle>
                          <div className={`px-2 py-1 rounded-full text-xs font-medium
                            ${certificate.status === "In Progress" ? "bg-blue-100 text-blue-800" : 
                              certificate.priority === "high" ? "bg-red-100 text-red-800" : 
                              "bg-gray-100 text-gray-800"}`
                          }>
                            {certificate.status}
                          </div>
                        </div>
                        <CardDescription>
                          {certificate.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center text-sm">
                            <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                            <span className="text-muted-foreground">{certificate.dueDate}</span>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">
                              {certificate.submissions.length > 0 ? 
                                `Last update: ${certificate.submissions[0].date}` : 
                                "No submissions yet"}
                            </span>
                            <Button asChild variant="secondary" size="sm">
                              <Link to={`/certificates/${certificate.id}`}>
                                View Details
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Certificates;
