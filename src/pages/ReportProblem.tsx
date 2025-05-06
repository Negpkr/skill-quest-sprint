
import React from "react";
import Layout from "../components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const ReportProblem: React.FC = () => {
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
          <h2 className="text-2xl font-bold mb-6">Problem Report Form</h2>
          <div className="space-y-6">
            <div>
              <Label htmlFor="issue">Issue Type</Label>
              <Input id="issue" placeholder="Select issue type" />
            </div>
            <div>
              <Label htmlFor="description">Describe the Problem</Label>
              <Textarea
                id="description"
                placeholder="Please describe what happened, what you expected to happen, and any steps to reproduce the issue..."
                rows={6}
              />
            </div>
            <div>
              <Label htmlFor="email">Your Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email if you want us to follow up with you"
              />
            </div>
            <Button className="w-full">Submit Report</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReportProblem;
