
import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CertificateFilters } from "@/components/certificates/CertificateFilters";
import { CertificateTabs } from "@/components/certificates/CertificateTabs";
import { Certificate } from "@/types/certificate";
import { getCertificateData } from "@/data/certificateData";

const Certificates = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  useEffect(() => {
    // Refresh certificate data when component mounts
    setCertificates(getCertificateData());
    
    // Set up interval to refresh data periodically to reflect admin changes
    const interval = setInterval(() => {
      setCertificates([...getCertificateData()]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <CertificateFilters />
          <CertificateTabs certificates={certificates} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Certificates;
