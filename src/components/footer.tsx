
import { Logo } from "@/components/ui/logo";

export function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground">
              Simplifying the process of identifying required testing services for better navigation to submission offices.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-maroon-700">Dashboard</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-maroon-700">Certificates</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-maroon-700">Locations</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-maroon-700">Help Center</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-maroon-700">FAQ</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-maroon-700">Support</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-maroon-700">Terms of Service</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-maroon-700">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground">JNTUH, Hyderabad</li>
              <li className="text-muted-foreground">support@certsubmit.edu</li>
              <li className="text-muted-foreground">+91 40 2272 1058</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Certificate Submission Assistant. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
