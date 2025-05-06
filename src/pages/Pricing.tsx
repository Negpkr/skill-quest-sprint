
import React from "react";
import Layout from "../components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Pricing: React.FC = () => {
  return (
    <Layout>
      <div className="bg-secondary py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that's right for your skill-building journey
          </p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Free Plan */}
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Free</CardTitle>
              <div className="text-center">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-muted-foreground ml-2">forever</span>
              </div>
              <CardDescription className="text-center">
                Perfect for getting started
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <span>Access to 3 starter sprints</span>
                </li>
                <li className="flex items-center">
                  <span>Basic progress tracking</span>
                </li>
                <li className="flex items-center">
                  <span>Community access (read-only)</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Get Started</Button>
            </CardFooter>
          </Card>
          
          {/* Pro Plan */}
          <Card className="border-skillpurple-400 shadow-lg">
            <div className="bg-skillpurple-400 text-white text-center py-2 text-sm font-medium">
              MOST POPULAR
            </div>
            <CardHeader>
              <CardTitle className="text-center">Pro</CardTitle>
              <div className="text-center">
                <span className="text-4xl font-bold">$12</span>
                <span className="text-muted-foreground ml-2">per month</span>
              </div>
              <CardDescription className="text-center">
                For committed skill-builders
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <span>Access to all skill sprints</span>
                </li>
                <li className="flex items-center">
                  <span>Advanced progress tracking</span>
                </li>
                <li className="flex items-center">
                  <span>Full community participation</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Subscribe Now</Button>
            </CardFooter>
          </Card>
          
          {/* Teams Plan */}
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Teams</CardTitle>
              <div className="text-center">
                <span className="text-4xl font-bold">$49</span>
                <span className="text-muted-foreground ml-2">per month</span>
              </div>
              <CardDescription className="text-center">
                Up to 5 team members
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <span>All Pro features included</span>
                </li>
                <li className="flex items-center">
                  <span>Team progress dashboard</span>
                </li>
                <li className="flex items-center">
                  <span>Custom sprint creation</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Contact Sales</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Pricing;
