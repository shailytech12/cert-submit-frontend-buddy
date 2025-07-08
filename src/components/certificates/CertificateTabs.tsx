
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CertificateCard } from "./CertificateCard";
import { Certificate } from "@/types/certificate";

interface CertificateTabsProps {
  certificates: Certificate[];
}

export const CertificateTabs = ({ certificates }: CertificateTabsProps) => {
  const pendingCertificates = certificates.filter(cert => 
    cert.status === "Pending" || cert.status === "Not Started" || cert.status === "In Progress"
  );

  const completedCertificates = certificates.filter(cert => cert.status === "Completed");

  const upcomingCertificates = certificates
    .filter(cert => cert.status !== "Completed")
    .sort((a, b) => new Date(a.dueDate.split(" ")[2]).getTime() - new Date(b.dueDate.split(" ")[2]).getTime());

  return (
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
            <CertificateCard key={certificate.id} certificate={certificate} />
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="pending" className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pendingCertificates.map(certificate => (
            <CertificateCard key={certificate.id} certificate={certificate} />
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="completed" className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {completedCertificates.map(certificate => (
            <CertificateCard key={certificate.id} certificate={certificate} />
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="upcoming" className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingCertificates.map(certificate => (
            <CertificateCard key={certificate.id} certificate={certificate} />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};
