
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/ui/logo";
import { useNavigate } from "react-router-dom";
import { adminLogout } from "@/utils/adminAuth";
import { useToast } from "@/hooks/use-toast";
import { Check, X, Eye, LogOut, Clock } from "lucide-react";
import { getCertificateData, updateCertificateStatus } from "@/data/certificateData";
import { Certificate } from "@/types/certificate";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  useEffect(() => {
    setCertificates(getCertificateData());
  }, []);

  const handleLogout = () => {
    adminLogout();
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
    navigate("/admin/login");
  };

  const handleStatusChange = (id: number, status: Certificate["status"]) => {
    updateCertificateStatus(id, status);
    setCertificates([...getCertificateData()]);
    
    const statusMessages = {
      "Completed": "approved",
      "In Progress": "marked as in progress",
      "Pending": "marked as pending"
    };
    
    toast({
      title: "Certificate Updated",
      description: `The certificate has been ${statusMessages[status]}.`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending":
      case "Not Started":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
      case "Completed":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Approved</Badge>;
      case "In Progress":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">In Progress</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const pendingCount = certificates.filter(cert => cert.status === "Pending" || cert.status === "Not Started").length;
  const approvedCount = certificates.filter(cert => cert.status === "Completed").length;
  const inProgressCount = certificates.filter(cert => cert.status === "In Progress").length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Logo />
            <div>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-sm text-gray-600">Welcome, Smily</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout} className="flex items-center">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Pending Certificates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">{pendingCount}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Approved Certificates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{approvedCount}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{inProgressCount}</div>
            </CardContent>
          </Card>
        </div>

        {/* Certificates Table */}
        <Card>
          <CardHeader>
            <CardTitle>Certificate Management</CardTitle>
            <CardDescription>
              Manage student certificate requests and update their status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Certificate Name</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {certificates.map((cert) => (
                  <TableRow key={cert.id}>
                    <TableCell className="font-medium">
                      <div className="font-semibold text-blue-600">{cert.studentName}</div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-semibold">{cert.name}</div>
                        <div className="text-sm text-gray-500">{cert.description}</div>
                      </div>
                    </TableCell>
                    <TableCell>{cert.dueDate}</TableCell>
                    <TableCell>
                      <Badge variant={cert.priority === "high" ? "destructive" : cert.priority === "medium" ? "default" : "secondary"}>
                        {cert.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(cert.status)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center"
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                        {cert.status !== "Completed" && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center text-green-600 hover:text-green-700"
                            onClick={() => handleStatusChange(cert.id, "Completed")}
                          >
                            <Check className="h-3 w-3 mr-1" />
                            Approve
                          </Button>
                        )}
                        {cert.status !== "In Progress" && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center text-blue-600 hover:text-blue-700"
                            onClick={() => handleStatusChange(cert.id, "In Progress")}
                          >
                            <Clock className="h-3 w-3 mr-1" />
                            In Progress
                          </Button>
                        )}
                        {cert.status !== "Pending" && cert.status !== "Not Started" && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center text-yellow-600 hover:text-yellow-700"
                            onClick={() => handleStatusChange(cert.id, "Pending")}
                          >
                            <X className="h-3 w-3 mr-1" />
                            Pending
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminDashboard;
