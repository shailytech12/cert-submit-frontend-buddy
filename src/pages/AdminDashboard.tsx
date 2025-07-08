
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/ui/logo";
import { useNavigate } from "react-router-dom";
import { adminLogout } from "@/utils/adminAuth";
import { useToast } from "@/hooks/use-toast";
import { Check, X, Eye, LogOut } from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock data for pending certificates
  const [certificates, setCertificates] = useState([
    {
      id: 1,
      studentName: "John Doe",
      studentId: "ST001",
      certificateType: "Bonafide Certificate",
      submittedDate: "2025-01-05",
      status: "pending",
      documents: ["transcript.pdf", "id_card.jpg"],
    },
    {
      id: 2,
      studentName: "Jane Smith",
      studentId: "ST002",
      certificateType: "Course Completion Certificate",
      submittedDate: "2025-01-06",
      status: "pending",
      documents: ["course_record.pdf"],
    },
    {
      id: 3,
      studentName: "Mike Johnson",
      studentId: "ST003",
      certificateType: "No Dues Certificate",
      submittedDate: "2025-01-04",
      status: "approved",
      documents: ["dues_clearance.pdf"],
    },
  ]);

  const handleLogout = () => {
    adminLogout();
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
    navigate("/admin/login");
  };

  const handleApprove = (id: number) => {
    setCertificates(prev => 
      prev.map(cert => 
        cert.id === id ? { ...cert, status: "approved" } : cert
      )
    );
    toast({
      title: "Certificate Approved",
      description: "The certificate has been approved successfully.",
    });
  };

  const handleReject = (id: number) => {
    setCertificates(prev => 
      prev.map(cert => 
        cert.id === id ? { ...cert, status: "rejected" } : cert
      )
    );
    toast({
      title: "Certificate Rejected",
      description: "The certificate has been rejected.",
      variant: "destructive",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
      case "approved":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Approved</Badge>;
      case "rejected":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Rejected</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const pendingCount = certificates.filter(cert => cert.status === "pending").length;
  const approvedCount = certificates.filter(cert => cert.status === "approved").length;
  const rejectedCount = certificates.filter(cert => cert.status === "rejected").length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Logo />
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
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
              <CardTitle className="text-lg">Rejected Certificates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">{rejectedCount}</div>
            </CardContent>
          </Card>
        </div>

        {/* Certificates Table */}
        <Card>
          <CardHeader>
            <CardTitle>Certificate Validation</CardTitle>
            <CardDescription>
              Review and validate student certificate requests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Certificate Type</TableHead>
                  <TableHead>Submitted Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {certificates.map((cert) => (
                  <TableRow key={cert.id}>
                    <TableCell className="font-medium">{cert.studentName}</TableCell>
                    <TableCell>{cert.studentId}</TableCell>
                    <TableCell>{cert.certificateType}</TableCell>
                    <TableCell>{cert.submittedDate}</TableCell>
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
                        {cert.status === "pending" && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex items-center text-green-600 hover:text-green-700"
                              onClick={() => handleApprove(cert.id)}
                            >
                              <Check className="h-3 w-3 mr-1" />
                              Approve
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex items-center text-red-600 hover:text-red-700"
                              onClick={() => handleReject(cert.id)}
                            >
                              <X className="h-3 w-3 mr-1" />
                              Reject
                            </Button>
                          </>
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
