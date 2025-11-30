import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";
import dmsProject from "@/assets/DMS.png";
import complaintProject from "@/assets/CSRTS.png";
import fluxmartProject from "@/assets/MVEP.png";
import echoSocialProject from "@/assets/Echo.png";

const ProjectsSection = () => {
  const projects = [
    {
      title: "EchoSocial",
      description: "A modern, lightweight social platform built with the MERN stack. It lets users share posts, photos, and videos, follow each other, and engage through likes and comments in a clean, responsive interface.",
      image: echoSocialProject,
      technologies: ["MongoDB", "Express.js", "React", "Vite", "Node.js", "Tailwind CSS"],
      githubUrl: "https://github.com/hamzaiqbal35/ApexcifyTechnologys_Social-Media-Platform.git",
      features: ["User Authentication", "Post Creation & Sharing", "Like & Comment System", "Follow & Unfollow", "User Profiles", "Admin Dashboard"]
    },
    {
      title: "Fluxmart",
      description: "A multi-vendor ecommerce platform that enables vendors to manage products and orders while customers shop seamlessly across a unified marketplace, powered by a modern React and Node.js architecture.",
      image: fluxmartProject,
      technologies: ["MongoDB", "Express.js", "React", "Vite", "Node.js", "Tailwind CSS"],
      githubUrl: "https://github.com/hamzaiqbal35/ApexcifyTechnologys_Multi-Vendor-eCommerce-Platform.git",
      features: ["Multi-Vendor Marketplace", "User Authentication", "Product Management", "Shopping Cart", "Order Processing"]
    },
    {
      title: "Distribution Management System (DMS)",
      description: "Full-stack PHP/MySQL system for Allied Steel Works featuring comprehensive admin & customer portals with advanced purchase management, sales tracking, detailed reporting, and real-time analytics dashboard.",
      image: dmsProject,
      technologies: ["PHP", "MySQL", "JavaScript", "Bootstrap", "Chart.js"],
      githubUrl: "https://github.com/hamzaiqbal35/DMS.git",
      features: ["Admin Dashboard", "Customer Portal", "Sales Management", "Analytics", "Reporting"]
    },
    {
      title: "Complaint Service Request Tracking System",
      description: "Sophisticated role-based web application designed to efficiently track, manage, and resolve customer complaints with automated workflows, status updates, and comprehensive reporting capabilities.",
      image: complaintProject,
      technologies: ["PHP", "Laravel", "MySQL", "JavaScript", "CSS3", "AJAX", "JSON"],
      githubUrl: "https://github.com/hamzaiqbal35/Complaint_Service_Request_Tracking_System.git",
      features: ["Role Management", "Ticket Tracking", "Status Updates", "Email Notifications", "Reports"]
    }
  ];

  return (
    <section id="projects" className="py-20 px-4 bg-gradient-card">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real-world applications showcasing my technical expertise and problem-solving abilities
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={index}
              className="glass-effect hover:shadow-hover transition-all duration-300 animate-fade-in group overflow-hidden"
              style={{ animationDelay: `${index * 0.3}s` }}
            >
              {/* Project Image */}
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <CardHeader>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {project.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Technologies */}
                <div>
                  <h4 className="text-sm font-semibold mb-2 text-foreground">Technologies Used:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge 
                        key={techIndex}
                        variant="secondary"
                        className="bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h4 className="text-sm font-semibold mb-2 text-foreground">Key Features:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.features.map((feature, featureIndex) => (
                      <Badge 
                        key={featureIndex}
                        variant="outline"
                        className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground transition-all duration-200 text-xs"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                  <Button 
                    asChild
                    className="flex-1 bg-primary hover:bg-primary-glow transition-all duration-300"
                  >
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      View Code
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* More Projects CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-6">
            Want to see more of my work? Check out my GitHub profile for additional projects and contributions.
          </p>
          <Button 
            variant="outline"
            size="lg"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            asChild
          >
            <a href="https://github.com/hamzaiqbal35" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-5 w-5" />
              Visit My GitHub
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;