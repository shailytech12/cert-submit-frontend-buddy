
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Calendar, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { Certificate } from "@/types/certificate";

interface CertificateCardProps {
  certificate: Certificate;
}

export const CertificateCard = ({ certificate }: CertificateCardProps) => {
  const getStatusColor = (status: string, priority: string) => {
    if (status === "Completed") return "bg-green-500";
    if (status === "In Progress") return "bg-blue-500";
    if (priority === "high") return "bg-red-500";
    return "bg-gray-300";
  };

  const getStatusBadgeColor = (status: string, priority: string) => {
    if (status === "Completed") return "bg-green-100 text-green-800";
    if (status === "In Progress") return "bg-blue-100 text-blue-800";
    if (priority === "high") return "bg-red-100 text-red-800";
    return "bg-gray-100 text-gray-800";
  };

  return (
    <Card className="overflow-hidden">
      <div className={`h-2 w-full ${getStatusColor(certificate.status, certificate.priority)}`} />
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{certificate.name}</CardTitle>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(certificate.status, certificate.priority)}`}>
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
  );
};
