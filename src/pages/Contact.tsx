
import React, { useState } from "react";
import Layout from "../components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { submitContactMessage } from "@/utils/supabaseUtils";
import { Loader2 } from "lucide-react";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields before submitting.",
        variant: "destructive",
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await submitContactMessage(formData);

      if (result.success) {
        setSubmitted(true);
        toast({
          title: "Message sent!",
          description: "Thank you for contacting us. We'll get back to you soon.",
        });

        // Reset form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: ""
        });
      } else {
        throw new Error("Failed to submit message");
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="bg-secondary py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have questions or need help? We're here for you. Reach out to our team.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-lg border">
          {submitted ? (
            <div className="text-center py-8">
              <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-6">
                <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                <p>Thank you for contacting us. We'll get back to you as soon as possible.</p>
              </div>
              <Button
                onClick={() => setSubmitted(false)}
                className="bg-skillpurple-400 hover:bg-skillpurple-500"
              >
                Send Another Message
              </Button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Your email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="Subject of your message"
                    value={formData.subject}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="How can we help you?"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    required
                  />
                </div>
                <Button
                  className="w-full bg-skillpurple-400 hover:bg-skillpurple-500"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
