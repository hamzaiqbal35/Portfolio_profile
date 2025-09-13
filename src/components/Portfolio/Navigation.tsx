import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Home, User, Code, Briefcase, Mail, Download } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const navItems = [
    { id: "hero", label: "Home", icon: Home },
    { id: "about", label: "About", icon: User },
    { id: "skills", label: "Skills", icon: Code },
    { id: "projects", label: "Projects", icon: Briefcase },
    { id: "contact", label: "Contact", icon: Mail }
  ];

  // Function to handle resume download
  const handleDownloadResume = () => {
    try {
      const resumeUrl = `${window.location.origin}/Hamza_Iqbal_Resume.pdf`;
      const fileName = 'Hamza_Iqbal_Resume.pdf';
      
      fetch(resumeUrl)
        .then(response => response.blob())
        .then(blob => {
          // Create blob link to download
          const url = window.URL.createObjectURL(new Blob([blob]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', fileName);
          
          // Append to html link element page
          document.body.appendChild(link);
          
          // Start download
          link.click();
          
          // Clean up and remove the link
          link.parentNode?.removeChild(link);
          window.URL.revokeObjectURL(url);
        })
        .catch(() => {
          // Fallback to direct download
          const link = document.createElement('a');
          link.href = resumeUrl;
          link.download = fileName;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        });
    } catch (error) {
      console.error('Error downloading resume:', error);
      window.open('/Hamza_Iqbal_Resume.pdf', '_blank');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.id);
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed w-full bg-background/80 backdrop-blur-sm z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a href="#hero" className="text-xl font-bold text-primary">
              Hamza Iqbal
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${activeSection === item.id ? 'text-primary' : 'text-foreground/70 hover:text-foreground'}`}
              >
                <item.icon className="h-4 w-4 mr-1" />
                {item.label}
              </a>
            ))}
            <Button 
              onClick={handleDownloadResume}
              variant="outline" 
              size="sm"
              className="ml-2 flex items-center gap-1"
            >
              <Download className="h-4 w-4" />
              Resume
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="flex items-center px-3 py-2 text-base font-medium text-foreground/70 hover:bg-muted rounded-md"
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.label}
              </a>
            ))}
            <button
              onClick={() => {
                handleDownloadResume();
                setIsOpen(false);
              }}
              className="w-full flex items-center px-3 py-2 text-base font-medium text-foreground/70 hover:bg-muted rounded-md"
            >
              <Download className="h-5 w-5 mr-3" />
              Download Resume
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;