
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CertificateFilters } from "@/components/certificates/CertificateFilters";
import { CertificateTabs } from "@/components/certificates/CertificateTabs";
import { Certificate } from "@/types/certificate";

const Certificates = () => {
  // Mock data for certificates
  const certificates: Certificate[] = [
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
          <CertificateFilters />
          <CertificateTabs certificates={certificates} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Certificates;
