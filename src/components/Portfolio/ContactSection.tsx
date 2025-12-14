import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, MapPin, Phone, Github, Linkedin, Send } from "lucide-react";
import emailjs from '@emailjs/browser';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      // REPLACE THESE WITH YOUR ACTUAL EMAILJS CREDENTIALS
      const serviceID = 'service_lcqr48b';
      const templateID = 'template_1gvftkq';
      const publicKey = '03oq3Vg0_d8vGT2tP';

      const templateParams = {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        time: new Date().toLocaleString()
      };

      await emailjs.send(serviceID, templateID, templateParams, publicKey);

      toast({
        title: "Success!",
        description: "Your message has been sent successfully.",
      });

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      console.error('Failed to send email:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send message. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "hamzaiqbalrajpoot35@gmail.com",
      href: "mailto:hamzaiqbalrajpoot35@gmail.com"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Lahore, Pakistan",
      href: null
    },
    {
      icon: Github,
      label: "GitHub",
      value: "hamzaiqbal35",
      href: "https://github.com/hamzaiqbal35"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "Hamza Iqbal",
      href: "https://www.linkedin.com/in/hamza-iqbal-rajpoot-9a6624267/"
    }
  ];

  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Let's discuss your next project or just say hello. I'm always open to new opportunities!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8 animate-slide-in-left">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Let's Connect</h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                I'm always excited to work on new projects and collaborate with creative minds.
                Whether you have a project in mind, need technical consultation, or just want to
                connect, feel free to reach out!
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <Card key={index} className="glass-effect hover:shadow-hover transition-all duration-300 group">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <info.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground">{info.label}</p>
                        {info.href ? (
                          <a
                            href={info.href}
                            target={info.href.startsWith('http') ? "_blank" : "_self"}
                            rel="noopener noreferrer"
                            className="text-foreground hover:text-primary transition-colors font-medium"
                            onClick={(e) => {
                              if (info.href?.startsWith('mailto:')) {
                                e.stopPropagation();
                                window.location.href = info.href;
                              }
                            }}
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-foreground font-medium">{info.value}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <Card className="glass-effect animate-slide-in-right">
            <CardHeader>
              <CardTitle className="text-2xl">Send me a message</CardTitle>
              <CardDescription>
                Fill out the form below and I'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="border-muted focus:border-primary transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="border-muted focus:border-primary transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    autoComplete="off"
                    placeholder="What's this about?"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="border-muted focus:border-primary transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    autoComplete="off"
                    placeholder="Tell me about your project or just say hello..."
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="border-muted focus:border-primary transition-colors resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary-glow transition-all duration-300 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;