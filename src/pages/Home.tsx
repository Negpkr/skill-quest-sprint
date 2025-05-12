
import React from "react";
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <Layout>
      <Hero />
      
      {/* Featured Challenges Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold">Featured Challenges</h2>
            <Button asChild variant="ghost" className="text-skillpurple-500 hover:text-skillpurple-600">
              <Link to="/sprints" className="flex items-center">
                View all <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Sample challenge cards - these would ideally come from a data source */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-border">
              <div className="h-48 bg-gradient-to-r from-softpurple to-softblue flex items-center justify-center">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="p-4">
                <div className="flex justify-between mb-2">
                  <h3 className="font-semibold">Design Starter Sprint</h3>
                  <span className="badge-beginner">Beginner</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">Learn Canva basics and create your first sellable design in 30 days.</p>
                <div className="flex gap-2">
                  <Button asChild className="flex-1 bg-skillpurple-400 hover:bg-skillpurple-500">
                    <Link to="/sprints">Start Sprint</Link>
                  </Button>
                  <Button asChild variant="outline" className="gap-1 border-skillpurple-400 text-skillpurple-400 hover:bg-skillpurple-50 hover:text-skillpurple-500">
                    <Link to="/generate-sprint">
                      <Sparkles className="h-4 w-4" />
                      Generate
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-border">
              <div className="h-48 bg-gradient-to-r from-softblue to-softgreen flex items-center justify-center">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 21V5C16 3.89543 15.1046 3 14 3H10C8.89543 3 8 3.89543 8 5V21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="p-4">
                <div className="flex justify-between mb-2">
                  <h3 className="font-semibold">Web Dev Sprint</h3>
                  <span className="badge-intermediate">Intermediate</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">Build and launch your first website with HTML, CSS, and basic JavaScript.</p>
                <div className="flex gap-2">
                  <Button asChild className="flex-1 bg-skillpurple-400 hover:bg-skillpurple-500">
                    <Link to="/sprints">Start Sprint</Link>
                  </Button>
                  <Button asChild variant="outline" className="gap-1 border-skillpurple-400 text-skillpurple-400 hover:bg-skillpurple-50 hover:text-skillpurple-500">
                    <Link to="/generate-sprint">
                      <Sparkles className="h-4 w-4" />
                      Generate
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-border">
              <div className="h-48 bg-gradient-to-r from-softorange to-softpink flex items-center justify-center">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 6.65685 16.3431 8 18 8Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 15C7.65685 15 9 13.6569 9 12C9 10.3431 7.65685 9 6 9C4.34315 9 3 10.3431 3 12C3 13.6569 4.34315 15 6 15Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18 22C19.6569 22 21 20.6569 21 19C21 17.3431 19.6569 16 18 16C16.3431 16 15 17.3431 15 19C15 20.6569 16.3431 22 18 22Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8.59 13.51L15.42 17.49" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15.41 6.51L8.59 10.49" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="p-4">
                <div className="flex justify-between mb-2">
                  <h3 className="font-semibold">Freelance Launchpad</h3>
                  <span className="badge-beginner">Beginner</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">Start and earn from your first freelancing gig in just 30 days.</p>
                <div className="flex gap-2">
                  <Button asChild className="flex-1 bg-skillpurple-400 hover:bg-skillpurple-500">
                    <Link to="/sprints">Start Sprint</Link>
                  </Button>
                  <Button asChild variant="outline" className="gap-1 border-skillpurple-400 text-skillpurple-400 hover:bg-skillpurple-50 hover:text-skillpurple-500">
                    <Link to="/generate-sprint">
                      <Sparkles className="h-4 w-4" />
                      Generate
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* How it Works Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">How SkillSprint Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our 30-day challenge system breaks down skill learning and side hustle creation into simple daily actions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-skillpurple-400 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold mb-2">Choose a Skill</h3>
              <p className="text-sm text-muted-foreground">
                Select from our curated challenges or create a custom skill sprint
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-skillpurple-400 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold mb-2">Complete Daily Tasks</h3>
              <p className="text-sm text-muted-foreground">
                Follow simple micro-tasks that take 15-30 minutes each day
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-skillpurple-400 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold mb-2">Build Your Project</h3>
              <p className="text-sm text-muted-foreground">
                Create a real portfolio piece or minimum viable service
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-skillpurple-400 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                4
              </div>
              <h3 className="font-semibold mb-2">Launch Your Hustle</h3>
              <p className="text-sm text-muted-foreground">
                Start earning from your new skill with our launch guidance
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto bg-skillpurple-400 rounded-xl text-white p-8 md:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Start Your Skill Adventure?</h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Join thousands of others who are learning new skills and earning their first side income through our 30-day sprints.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-skillpurple-500 hover:bg-gray-100 hover:text-skillpurple-600">
              <Link to="/signup">Get Started For Free</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
