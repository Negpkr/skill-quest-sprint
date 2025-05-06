
import React from "react";
import Layout from "../components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const HelpCenter: React.FC = () => {
  return (
    <Layout>
      <div className="bg-secondary py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Help Center</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find tutorials, guides, and answers to all your SkillSprint questions
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
              <CardDescription>New to SkillSprint? Start here</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>
                  <Link to="#" className="text-skillpurple-500 hover:underline">
                    Creating your account
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-skillpurple-500 hover:underline">
                    Choosing your first sprint
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-skillpurple-500 hover:underline">
                    Understanding the dashboard
                  </Link>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View All</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Quick answers to common questions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Browse our comprehensive FAQ section for immediate answers to the most common questions.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link to="/faq">View FAQs</Link>
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>Get personalized help</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Need more help? Our support team is available via email, chat, or phone during business hours.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default HelpCenter;
