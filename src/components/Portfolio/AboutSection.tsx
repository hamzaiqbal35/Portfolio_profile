import { Card, CardContent } from "@/components/ui/card";
import { MapPin, GraduationCap, Code, Coffee } from "lucide-react";

const AboutSection = () => {
  const stats = [
    { icon: Code, label: "Years Experience", value: "3+" },
    { icon: Coffee, label: "Projects Completed", value: "15+" },
    { icon: GraduationCap, label: "Degree", value: "BSIT" },
    { icon: MapPin, label: "Location", value: "Lahore, PK" }
  ];

  return (
    <section id="about" className="py-20 px-4 bg-gradient-card">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Passionate about creating digital solutions that make a difference
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6 animate-slide-in-left">
            <p className="text-lg leading-relaxed text-muted-foreground">
              I'm a <strong className="text-primary">BSIT graduate</strong> from Lahore, Pakistan, 
              with a passion for full-stack web development. I specialize in creating clean, 
              scalable web applications using modern technologies like React, Laravel, and Node.js.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              My expertise spans across <strong className="text-secondary">front-end development</strong> with 
              React and Tailwind CSS, and <strong className="text-secondary">back-end development</strong> with 
              PHP/Laravel and Node.js. I have extensive experience with databases including MySQL, 
              Oracle XE, and MongoDB.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              I believe in writing clean, maintainable code and focus heavily on 
              <strong className="text-accent"> performance optimization</strong> and 
              <strong className="text-accent"> security best practices</strong>. 
              When I'm not coding, you'll find me exploring new technologies or contributing to open-source projects.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-6 animate-slide-in-right">
            {stats.map((stat, index) => (
              <Card key={index} className="glass-effect hover:shadow-hover transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">
                    <stat.icon className="h-8 w-8 text-primary group-hover:text-primary-glow transition-colors" />
                  </div>
                  <div className="text-2xl font-bold text-foreground mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;