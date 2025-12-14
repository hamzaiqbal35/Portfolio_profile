import { Card, CardContent } from "@/components/ui/card";
import { MapPin, GraduationCap, Code, Coffee } from "lucide-react";
import profilePicture from "@/assets/profile-picture.jpg";

const AboutSection = () => {
  const stats = [
    { icon: Code, label: "Years Experience", value: "2+" },
    { icon: Coffee, label: "Projects Completed", value: "10+" },
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
            Hamza Iqbal – Full-Stack Developer
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 items-start">
          {/* Profile Picture */}
          <div className="lg:col-span-1 flex justify-center animate-slide-in-left lg:sticky lg:top-24">
            <div className="relative group">
              <div className="w-72 h-72 md:w-80 md:h-80 rounded-full overflow-hidden shadow-2xl border-4 border-primary/20 group-hover:border-primary/50 transition-all duration-500 ease-out">
                <img
                  src={profilePicture}
                  alt="Hamza Iqbal - Full Stack Developer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 md:-bottom-4 md:-right-4 w-14 h-14 md:w-16 md:h-16 bg-primary rounded-full flex items-center justify-center shadow-lg animate-bounce-slow z-10">
                <Code className="h-7 w-7 md:h-8 md:w-8 text-primary-foreground" />
              </div>
              {/* Decorative circle */}
              <div className="absolute inset-0 rounded-full border border-primary/10 scale-110 animate-pulse-slow -z-10"></div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-2 space-y-8 animate-slide-in-right">
            <div className="bg-card/50 backdrop-blur-sm p-6 rounded-2xl border border-border/50 shadow-sm hover:shadow-md transition-all duration-300">
              <p className="text-lg leading-relaxed text-muted-foreground">
                I am a <strong className="text-foreground font-semibold">Full-Stack Web Developer</strong> from Lahore, Pakistan, with experience building scalable, maintainable, and high-performance web applications using technologies like <span className="text-primary font-medium">React</span>, <span className="text-primary font-medium">Laravel</span>, and <span className="text-primary font-medium">Node.js</span>.
              </p>
            </div>

            <div className="bg-card/50 backdrop-blur-sm p-6 rounded-2xl border border-border/50 shadow-sm hover:shadow-md transition-all duration-300">
              <p className="text-lg leading-relaxed text-muted-foreground">
                I work across both <span className="text-secondary font-medium">front-end</span> and <span className="text-secondary font-medium">back-end development</span>, designing applications that are functional, secure, and efficient. My experience includes working with databases such as <span className="text-accent font-medium">MySQL</span> and <span className="text-accent font-medium">MongoDB</span>, and I prioritize writing clean, well-structured code that follows best practices in performance and security.
              </p>
            </div>

            <div className="bg-card/50 backdrop-blur-sm p-6 rounded-2xl border border-border/50 shadow-sm hover:shadow-md transition-all duration-300">
              <p className="text-lg leading-relaxed text-muted-foreground">
                I enjoy solving complex problems, contributing to open-source projects, and continuously improving my skills to stay current with modern web development trends. Outside of coding, I explore new tools and frameworks to refine my craft and deliver reliable software solutions.
              </p>
            </div>

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