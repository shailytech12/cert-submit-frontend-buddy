
import { Certificate } from "@/types/certificate";

// Shared certificate data that both admin and student dashboards will use
export const certificateData: Certificate[] = [
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

// Function to get certificate data (can be extended to use real state management)
export const getCertificateData = () => certificateData;

// Function to update certificate status (in a real app, this would update a database)
export const updateCertificateStatus = (id: number, status: Certificate["status"]) => {
  const certificate = certificateData.find(cert => cert.id === id);
  if (certificate) {
    certificate.status = status;
    // Add submission record when status changes
    if (status === "Completed") {
      certificate.submissions.push({
        date: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        }),
        office: "Admin Panel",
        status: "Approved"
      });
    } else if (status === "In Progress") {
      certificate.submissions.push({
        date: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        }),
        office: "Admin Panel",
        status: "Under Review"
      });
    }
  }
};
