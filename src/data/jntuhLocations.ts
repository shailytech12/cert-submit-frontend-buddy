
export const jntuhLocations = [
  {
    id: 1,
    name: "Academic Section",
    building: "Administrative Block",
    floor: "1st Floor",
    room: "A-105",
    hours: "9:00 AM - 5:00 PM",
    days: "Monday - Friday",
    coordinates: { lat: 17.4932, lng: 78.3931 },
    certificates: ["Bonafide Certificate", "Character Certificate", "Course Completion Certificate"],
    contact: "+91 40 2304 2000",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500",
    description: "Main academic office for student certificates and academic records"
  },
  {
    id: 2,
    name: "Examination Branch",
    building: "Examination Block",
    floor: "Ground Floor",
    room: "E-12",
    hours: "10:00 AM - 4:00 PM",
    days: "Monday - Saturday",
    coordinates: { lat: 17.4935, lng: 78.3938 },
    certificates: ["Provisional Certificate", "Degree Certificate", "Academic Transcript", "Migration Certificate"],
    contact: "+91 40 2304 2100",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500",
    description: "Official examination records and degree certificates"
  },
  {
    id: 3,
    name: "Controller of Examinations Office",
    building: "Administrative Block",
    floor: "2nd Floor",
    room: "A-201",
    hours: "9:30 AM - 4:30 PM",
    days: "Monday - Friday",
    coordinates: { lat: 17.4930, lng: 78.3940 },
    certificates: ["Consolidated Marks Memo", "Revaluation Results", "Duplicate Certificates"],
    contact: "+91 40 2304 2150",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500",
    description: "Official examination results and revaluation services"
  },
  {
    id: 4,
    name: "Student Affairs Office",
    building: "Student Activity Center",
    floor: "1st Floor",
    room: "S-101",
    hours: "10:00 AM - 3:00 PM",
    days: "Monday - Friday",
    coordinates: { lat: 17.4928, lng: 78.3925 },
    certificates: ["No Dues Certificate", "Conduct Certificate", "Anti-Ragging Certificate"],
    contact: "+91 40 2304 2200",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=500",
    description: "Student welfare and conduct related certificates"
  },
  {
    id: 5,
    name: "Registrar Office",
    building: "Administrative Block",
    floor: "3rd Floor",
    room: "A-301",
    hours: "9:00 AM - 5:00 PM",
    days: "Monday - Friday",
    coordinates: { lat: 17.4933, lng: 78.3950 },
    certificates: ["University Authentication", "Official Transcripts", "Verification Letters"],
    contact: "+91 40 2304 2050",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500",
    description: "High-level university documentation and official verifications"
  },
  {
    id: 6,
    name: "Finance Section",
    building: "Administrative Block",
    floor: "Ground Floor",
    room: "A-005",
    hours: "9:00 AM - 4:00 PM",
    days: "Monday - Saturday",
    coordinates: { lat: 17.4931, lng: 78.3935 },
    certificates: ["Fee Payment Receipts", "Scholarship Certificates", "Financial Clearance"],
    contact: "+91 40 2304 2300",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500",
    description: "All fee-related documentation and financial clearances"
  }
];

export const certificateSubmissionInfo = {
  deadlines: {
    "Bonafide Certificate": "No specific deadline - available year-round",
    "Character Certificate": "Apply 15 days before requirement date",
    "Course Completion Certificate": "Within 6 months of course completion",
    "Provisional Certificate": "Apply after final semester results",
    "Degree Certificate": "Apply 3 months after provisional certificate",
    "Academic Transcript": "No deadline - available on request",
    "Migration Certificate": "Apply within 2 years of graduation",
    "No Dues Certificate": "Apply during final semester",
    "Conduct Certificate": "Apply 10 days before requirement"
  },
  
  requirements: {
    "Bonafide Certificate": ["Application form", "Student ID", "Fee payment receipt (₹50)"],
    "Character Certificate": ["Application form", "Student ID", "Fee payment receipt (₹100)", "Conduct clearance"],
    "Course Completion Certificate": ["Application form", "All semester mark sheets", "Fee payment receipt (₹200)"],
    "Provisional Certificate": ["Application form", "Final semester results", "Fee payment receipt (₹500)", "No dues certificate"],
    "Degree Certificate": ["Provisional certificate", "Original mark sheets", "Fee payment receipt (₹1000)", "Convocation fee"],
    "Academic Transcript": ["Application form", "Previous transcripts (if any)", "Fee payment receipt (₹300)"],
    "Migration Certificate": ["Application form", "Original certificates", "Fee payment receipt (₹1000)", "NOC from current institution"],
    "No Dues Certificate": ["Clearance from all departments", "Library clearance", "Hostel clearance (if applicable)"],
    "Conduct Certificate": ["Application form", "Disciplinary clearance", "Fee payment receipt (₹100)"]
  },

  processingTime: {
    "Bonafide Certificate": "1-2 working days",
    "Character Certificate": "3-5 working days",
    "Course Completion Certificate": "7-10 working days",
    "Provisional Certificate": "15-20 working days",
    "Degree Certificate": "30-45 working days",
    "Academic Transcript": "5-7 working days",
    "Migration Certificate": "20-30 working days",
    "No Dues Certificate": "2-3 working days",
    "Conduct Certificate": "5-7 working days"
  }
};
