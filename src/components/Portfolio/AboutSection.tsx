import { Card, CardContent } from "@/components/ui/card";
import { MapPin, GraduationCap, Code, Coffee } from "lucide-react";
import profilePicture from "@/assets/profile-picture.jpg";

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

        <div className="grid lg:grid-cols-3 gap-12 items-center">
          {/* Profile Picture */}
          <div className="lg:col-span-1 flex justify-center animate-slide-in-left">
            <div className="relative">
              <div className="w-80 h-80 rounded-full overflow-hidden shadow-glow border-4 border-primary/20 hover:border-primary/40 transition-all duration-300">
                <img 
                  src={profilePicture} 
                  alt="Hamza Iqbal - Full Stack Developer"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow">
                <Code className="h-8 w-8 text-primary-foreground" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-2 space-y-6 animate-slide-in-right">
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

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {stats.map((stat, index) => (
                <Card key={index} className="glass-effect hover:shadow-hover transition-all duration-300 group">
                  <CardContent className="p-4 text-center">
                    <div className="mb-2 flex justify-center">
                      <stat.icon className="h-6 w-6 text-primary group-hover:text-primary-glow transition-colors" />
                    </div>
                    <div className="text-xl font-bold text-foreground mb-1">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;