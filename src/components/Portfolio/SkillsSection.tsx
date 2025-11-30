import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Database, Server, Wrench } from "lucide-react";

const SkillsSection = () => {
  const skillCategories = [
    {
      title: "Front-End Development",
      icon: Code,
      color: "text-primary",
      skills: ["React", "JavaScript", "Tailwind CSS", "HTML", "CSS", "Responsive Design"]
    },
    {
      title: "Back-End Development", 
      icon: Server,
      color: "text-secondary",
      skills: ["PHP (Laravel)", "Node.js", "Express.js", "RESTful APIs", "Authentication", "Security"]
    },
    {
      title: "Database Management",
      icon: Database,
      color: "text-accent",
      skills: ["MySQL", "Oracle XE", "MongoDB", "Database Design"]
    },
    {
      title: "Tools & Technologies",
      icon: Wrench,
      color: "text-primary-glow",
      skills: ["Git/GitHub", "Vite", "XAMPP", "VS Code", "Linux"]
    }
  ];

  return (
    <section id="skills" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit for building modern web applications
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <Card 
              key={index} 
              className="glass-effect hover:shadow-hover transition-all duration-300 animate-fade-in group"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <category.icon className={`h-6 w-6 ${category.color} group-hover:scale-110 transition-transform`} />
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <Badge 
                      key={skillIndex} 
                      variant="secondary"
                      className="bg-muted hover:bg-primary hover:text-primary-foreground transition-all duration-300 cursor-default"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Skills */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-semibold mb-6">Core Competencies</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Problem Solving", "System Design", "Performance Optimization", 
              "Code Review", "Team Collaboration", "Agile Development",
              "UI/UX Design", "Testing", "Documentation"
            ].map((competency, index) => (
              <Badge 
                key={index}
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 px-4 py-2"
              >
                {competency}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;