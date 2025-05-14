
import React, { useState } from "react";
import Layout from "../components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { submitProblemReport } from "@/utils/supabaseUtils";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ReportProblem: React.FC = () => {
  const [formData, setFormData] = useState({
    issue_type: "",
    description: "",
    email: ""
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

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      issue_type: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!formData.issue_type || !formData.description) {
      toast({
        title: "Missing information",
        description: "Please select an issue type and describe the problem.",
        variant: "destructive",
      });
      return;
    }

    // Validate email if provided
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address or leave it blank.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await submitProblemReport(formData);

      if (result.success) {
        setSubmitted(true);
        toast({
          title: "Report submitted!",
          description: "Thank you for reporting this issue. We'll look into it as soon as possible.",
        });

        // Reset form
        setFormData({
          issue_type: "",
          description: "",
          email: ""
        });
      } else {
        throw new Error("Failed to submit report");
      }
    } catch (error) {
      console.error("Error submitting problem report:", error);
      toast({
        title: "Error",
        description: "There was a problem submitting your report. Please try again later.",
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
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Report a Problem</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Found something not working correctly? Let us know and we'll fix it as soon as possible.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-lg border">
          {submitted ? (
            <div className="text-center py-8">
              <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-6">
                <h3 className="text-xl font-bold mb-2">Report Submitted!</h3>
                <p>Thank you for helping us improve. We'll look into this issue as soon as possible.</p>
              </div>
              <Button
                onClick={() => setSubmitted(false)}
                className="bg-skillpurple-400 hover:bg-skillpurple-500"
              >
                Report Another Problem
              </Button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-6">Problem Report Form</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="issue_type">Issue Type</Label>
                  <Select
                    onValueChange={handleSelectChange}
                    value={formData.issue_type}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger id="issue_type" className="w-full">
                      <SelectValue placeholder="Select issue type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bug">Bug or Error</SelectItem>
                      <SelectItem value="feature">Feature Request</SelectItem>
                      <SelectItem value="content">Content Issue</SelectItem>
                      <SelectItem value="account">Account Problem</SelectItem>
                      <SelectItem value="payment">Payment Issue</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="description">Describe the Problem</Label>
                  <Textarea
                    id="description"
                    placeholder="Please describe what happened, what you expected to happen, and any steps to reproduce the issue..."
                    rows={6}
                    value={formData.description}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Your Email (Optional)</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email if you want us to follow up with you"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isSubmitting}
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
                      Submitting...
                    </>
                  ) : (
                    "Submit Report"
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

export default ReportProblem;
