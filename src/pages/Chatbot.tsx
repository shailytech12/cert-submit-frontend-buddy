
import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Send, Bot, User, MapPin } from "lucide-react";
import { jntuhLocations, certificateSubmissionInfo } from "@/data/jntuhLocations";

type Message = {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
};

const Chatbot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your JNTUH Certificate Assistant. I can help you with information about certificate submissions, locations, deadlines, requirements, and processing times at Jawaharlal Nehru Technological University Hyderabad. How can I assist you today?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);

  // Enhanced bot responses with JNTUH-specific information
  const getBotResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    // Location-based queries
    if (lowerQuery.includes("where") || lowerQuery.includes("location") || lowerQuery.includes("office")) {
      if (lowerQuery.includes("bonafide")) {
        const location = jntuhLocations.find(loc => loc.certificates.includes("Bonafide Certificate"));
        return `Bonafide Certificate can be obtained from the ${location?.name} located in ${location?.building}, ${location?.floor}, Room ${location?.room}. Office hours: ${location?.hours}, ${location?.days}. Contact: ${location?.contact}. You'll need an application form, student ID, and fee payment receipt of ₹50.`;
      }
      
      if (lowerQuery.includes("degree") || lowerQuery.includes("degree certificate")) {
        const location = jntuhLocations.find(loc => loc.certificates.includes("Degree Certificate"));
        return `Degree Certificate is issued by the ${location?.name} at ${location?.building}, ${location?.floor}, Room ${location?.room}. Office hours: ${location?.hours}. Contact: ${location?.contact}. Processing time: 30-45 working days. You need your provisional certificate, original mark sheets, fee payment receipt of ₹1000, and convocation fee payment.`;
      }
      
      if (lowerQuery.includes("transcript") || lowerQuery.includes("academic transcript")) {
        const location = jntuhLocations.find(loc => loc.certificates.includes("Academic Transcript"));
        return `Academic Transcripts are issued by the ${location?.name} located at ${location?.building}, ${location?.floor}, Room ${location?.room}. Office hours: ${location?.hours}. Contact: ${location?.contact}. Processing time: 5-7 working days. Fee: ₹300. Required documents: Application form, previous transcripts (if any), and fee payment receipt.`;
      }
      
      return `JNTUH has several certificate submission locations:\n\n${jntuhLocations.map(loc => 
        `• ${loc.name}: ${loc.building}, ${loc.floor}, Room ${loc.room}\n  Handles: ${loc.certificates.join(', ')}\n  Contact: ${loc.contact}`
      ).join('\n\n')}\n\nWhich specific certificate location are you looking for?`;
    }
    
    // Certificate-specific queries
    if (lowerQuery.includes("bonafide")) {
      const cert = "Bonafide Certificate";
      const deadline = certificateSubmissionInfo.deadlines[cert];
      const requirements = certificateSubmissionInfo.requirements[cert];
      const processing = certificateSubmissionInfo.processingTime[cert];
      
      return `**Bonafide Certificate Information:**\n\n**Deadline:** ${deadline}\n**Processing Time:** ${processing}\n**Requirements:** ${requirements.join(', ')}\n**Location:** Academic Section, Administrative Block, 1st Floor, Room A-105\n**Contact:** +91 40 2304 2000\n\nThis certificate is available year-round and is commonly required for various purposes like bank loans, passport applications, etc.`;
    }
    
    if (lowerQuery.includes("provisional") || lowerQuery.includes("provisional certificate")) {
      const cert = "Provisional Certificate";
      const deadline = certificateSubmissionInfo.deadlines[cert];
      const requirements = certificateSubmissionInfo.requirements[cert];
      const processing = certificateSubmissionInfo.processingTime[cert];
      
      return `**Provisional Certificate Information:**\n\n**Deadline:** ${deadline}\n**Processing Time:** ${processing}\n**Requirements:** ${requirements.join(', ')}\n**Location:** Examination Branch, Examination Block, Ground Floor, Room E-12\n**Contact:** +91 40 2304 2100\n**Fee:** ₹500\n\nThis certificate is issued after final semester results are declared and before the degree certificate.`;
    }
    
    if (lowerQuery.includes("character certificate")) {
      const cert = "Character Certificate";
      const deadline = certificateSubmissionInfo.deadlines[cert];
      const requirements = certificateSubmissionInfo.requirements[cert];
      const processing = certificateSubmissionInfo.processingTime[cert];
      
      return `**Character Certificate Information:**\n\n**Deadline:** ${deadline}\n**Processing Time:** ${processing}\n**Requirements:** ${requirements.join(', ')}\n**Location:** Academic Section, Administrative Block, 1st Floor, Room A-105\n**Contact:** +91 40 2304 2000\n**Fee:** ₹100\n\nRequired for employment, higher studies, and visa applications.`;
    }
    
    if (lowerQuery.includes("migration certificate")) {
      const cert = "Migration Certificate";
      const deadline = certificateSubmissionInfo.deadlines[cert];
      const requirements = certificateSubmissionInfo.requirements[cert];
      const processing = certificateSubmissionInfo.processingTime[cert];
      
      return `**Migration Certificate Information:**\n\n**Deadline:** ${deadline}\n**Processing Time:** ${processing}\n**Requirements:** ${requirements.join(', ')}\n**Location:** Examination Branch, Examination Block, Ground Floor, Room E-12\n**Contact:** +91 40 2304 2100\n**Fee:** ₹1000\n\nRequired when transferring to another university or for higher studies abroad.`;
    }
    
    // Fee-related queries
    if (lowerQuery.includes("fee") || lowerQuery.includes("cost") || lowerQuery.includes("price")) {
      return `**JNTUH Certificate Fees:**\n\n• Bonafide Certificate: ₹50\n• Character Certificate: ₹100\n• Course Completion Certificate: ₹200\n• Academic Transcript: ₹300\n• Provisional Certificate: ₹500\n• Degree Certificate: ₹1000\n• Migration Certificate: ₹1000\n\n**Payment Methods:**\n• Online payment through JNTUH portal\n• DD/Cheque in favor of 'Registrar, JNTUH'\n• Cash payment at Finance Section (Ground Floor, Administrative Block)\n\nFees are subject to change. Please verify current rates before payment.`;
    }
    
    // Processing time queries
    if (lowerQuery.includes("processing time") || lowerQuery.includes("how long") || lowerQuery.includes("time") || lowerQuery.includes("duration")) {
      return `**JNTUH Certificate Processing Times:**\n\n• Bonafide Certificate: 1-2 working days\n• Character Certificate: 3-5 working days\n• Course Completion Certificate: 7-10 working days\n• Academic Transcript: 5-7 working days\n• No Dues Certificate: 2-3 working days\n• Conduct Certificate: 5-7 working days\n• Provisional Certificate: 15-20 working days\n• Migration Certificate: 20-30 working days\n• Degree Certificate: 30-45 working days\n\nProcessing times may vary during peak periods (exam seasons, graduation time). Apply well in advance for time-sensitive requirements.`;
    }
    
    // Contact information
    if (lowerQuery.includes("contact") || lowerQuery.includes("phone") || lowerQuery.includes("number")) {
      return `**JNTUH Contact Information:**\n\n**Main University Office:** +91 40 2304 2000\n**Student Helpline:** +91 40 2304 2222\n**Examination Branch:** +91 40 2304 2100\n**Academic Section:** +91 40 2304 2000\n**Registrar Office:** +91 40 2304 2050\n**Finance Section:** +91 40 2304 2300\n\n**Address:**\nJawaharlal Nehru Technological University Hyderabad\nKukatpally, Hyderabad - 500085\nTelangana, India\n\n**Website:** jntuh.ac.in\n**Email:** registrar@jntuh.ac.in`;
    }
    
    // Working hours
    if (lowerQuery.includes("hours") || lowerQuery.includes("timings") || lowerQuery.includes("open")) {
      return `**JNTUH Office Hours:**\n\n**Regular Offices:** 9:00 AM - 5:00 PM (Monday to Friday)\n**Examination Branch:** 10:00 AM - 4:00 PM (Monday to Saturday)\n**Finance Section:** 9:00 AM - 4:00 PM (Monday to Saturday)\n**Student Affairs:** 10:00 AM - 3:00 PM (Monday to Friday)\n\n**Note:** Offices remain closed on Sundays and public holidays. During examination periods, some offices may have extended hours. Always call ahead to confirm timings before visiting.`;
    }
    
    // Online services
    if (lowerQuery.includes("online") || lowerQuery.includes("website") || lowerQuery.includes("portal")) {
      return `**JNTUH Online Services:**\n\n**Official Website:** jntuh.ac.in\n**Student Portal:** Results, fee payment, certificate applications\n**Online Applications:** Available for most certificates\n**Fee Payment:** Online payment gateway available\n**Result Verification:** Online verification system\n\n**Steps for Online Application:**\n1. Visit jntuh.ac.in\n2. Go to 'Student Services' section\n3. Select the required certificate\n4. Fill the application form\n5. Pay fees online\n6. Submit and note application number\n7. Track status online\n\nPhysical submission may still be required for some documents.`;
    }
    
    // Requirements queries
    if (lowerQuery.includes("requirements") || lowerQuery.includes("documents") || lowerQuery.includes("need")) {
      return `**General Requirements for JNTUH Certificates:**\n\n**Common Documents:**\n• Original certificates and photocopies\n• Valid student ID card or Hall Ticket\n• Filled application form (download from JNTUH website)\n• Fee payment receipt\n• Passport-size photographs (2-3)\n\n**Additional Requirements (if applicable):**\n• No Dues Certificate\n• Previous academic transcripts\n• Conduct clearance certificate\n• Migration certificate from previous institution\n• NOC from current institution\n\n**Important:** Requirements may vary by certificate type. Always check the specific requirements for your needed certificate on the JNTUH website or contact the relevant office.`;
    }
    
    // General help
    if (lowerQuery.includes("help") || lowerQuery.includes("how to") || lowerQuery.includes("procedure")) {
      return `**How to Apply for JNTUH Certificates:**\n\n**Step 1:** Determine the certificate you need and the issuing office\n**Step 2:** Check requirements and fees on JNTUH website\n**Step 3:** Download and fill the application form\n**Step 4:** Arrange required documents and photos\n**Step 5:** Pay the fees (online or offline)\n**Step 6:** Submit application at the relevant office\n**Step 7:** Collect receipt and note processing time\n**Step 8:** Track status if online facility available\n**Step 9:** Collect certificate on specified date\n\n**Tips:**\n• Apply well in advance\n• Keep photocopies of all documents\n• Verify office timings before visiting\n• Carry contact numbers for follow-up`;
    }
    
    return "I'm here to help with JNTUH certificate-related queries. You can ask me about:\n\n• Certificate locations and offices\n• Fees and processing times\n• Required documents and procedures\n• Contact information and office hours\n• Online application processes\n• Specific certificate requirements\n\nWhat specific information do you need about JNTUH certificates?";
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      isBot: false,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    
    // Simulate AI response
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: getBotResponse(input),
        isBot: true,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
    setTimeout(() => handleSendMessage(), 100);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Chat Interface */}
            <div className="w-full md:w-2/3">
              <Card className="h-[calc(100vh-250px)] flex flex-col">
                <CardContent className="flex flex-col h-full p-0">
                  <div className="bg-maroon-700 text-white p-4">
                    <h2 className="text-xl font-semibold flex items-center">
                      <Bot className="h-5 w-5 mr-2" />
                      JNTUH Certificate Assistant
                    </h2>
                    <p className="text-sm opacity-80">
                      Ask me about JNTUH certificate submissions, locations, fees, deadlines, and requirements
                    </p>
                  </div>
                  
                  <div className="flex-grow overflow-y-auto p-4 space-y-4">
                    {messages.map(message => (
                      <div
                        key={message.id}
                        className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
                      >
                        <div className={`max-w-[80%] rounded-lg p-3 ${
                          message.isBot 
                            ? "bg-white border border-gray-200 text-gray-800" 
                            : "bg-maroon-600 text-white"
                        }`}>
                          <div className="flex items-center mb-1">
                            {message.isBot ? (
                              <Bot className="h-4 w-4 mr-1" />
                            ) : (
                              <User className="h-4 w-4 mr-1" />
                            )}
                            <span className="text-xs font-medium">
                              {message.isBot ? "JNTUH Assistant" : "You"}
                            </span>
                            <span className="text-xs ml-2 opacity-70">
                              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                          <div className="whitespace-pre-line">
                            {message.text}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-4 border-t">
                    <div className="flex items-center space-x-2">
                      <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask about JNTUH certificates, locations, fees, deadlines..."
                        className="flex-grow"
                      />
                      <Button 
                        onClick={handleSendMessage}
                        className="bg-maroon-700 hover:bg-maroon-800"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Sidebar */}
            <div className="w-full md:w-1/3 space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-4">Popular Questions</h3>
                  <div className="space-y-2">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-left h-auto py-2"
                      onClick={() => handleSuggestedQuestion("Where can I get my bonafide certificate?")}
                    >
                      Where can I get my bonafide certificate?
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-left h-auto py-2"
                      onClick={() => handleSuggestedQuestion("What are the fees for different certificates?")}
                    >
                      What are the fees for different certificates?
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-left h-auto py-2"
                      onClick={() => handleSuggestedQuestion("How long does it take to get a degree certificate?")}
                    >
                      How long does it take to get a degree certificate?
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-left h-auto py-2"
                      onClick={() => handleSuggestedQuestion("What documents are required for provisional certificate?")}
                    >
                      What documents are required for provisional certificate?
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-left h-auto py-2"
                      onClick={() => handleSuggestedQuestion("What are the office hours of examination branch?")}
                    >
                      What are the office hours of examination branch?
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    Quick Locations
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="font-medium">Academic Section</p>
                      <p className="text-muted-foreground text-xs">Admin Block, 1st Floor, A-105</p>
                      <p className="text-muted-foreground text-xs">Bonafide, Character Certificates</p>
                    </div>
                    <div>
                      <p className="font-medium">Examination Branch</p>
                      <p className="text-muted-foreground text-xs">Exam Block, Ground Floor, E-12</p>
                      <p className="text-muted-foreground text-xs">Degree, Provisional, Transcripts</p>
                    </div>
                    <div>
                      <p className="font-medium">Registrar Office</p>
                      <p className="text-muted-foreground text-xs">Admin Block, 3rd Floor, A-301</p>
                      <p className="text-muted-foreground text-xs">Official Verifications</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-4">Need Personal Help?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Contact JNTUH directly for personalized assistance with your certificate requirements.
                  </p>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full" asChild>
                      <a href="tel:+914023042222">Call Student Helpline</a>
                    </Button>
                    <Button variant="secondary" className="w-full" asChild>
                      <a href="mailto:registrar@jntuh.ac.in">Email Registrar</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Chatbot;
