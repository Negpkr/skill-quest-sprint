
import React from "react";
import Layout from "../components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About: React.FC = () => {
  return (
    <Layout>
      <div className="bg-secondary py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">About SkillSprint</h1>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Helping beginners transform skills into income streams through guided 30-day challenges.
          </p>
        </div>
      </div>
      
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="prose lg:prose-lg max-w-none">
          <h2>Our Mission</h2>
          <p>
            SkillSprint helps beginners stop procrastinating and start building by taking small daily actions toward 
            learning skills and launching mini income streams. Our mission is to make skill-building fun, accessible, 
            and income-generating for everyone, everywhere.
          </p>

          <h2>How We Help</h2>
          <p>
            We break down complex skills and side hustle creation into manageable, daily micro-tasks. By following our 
            30-day sprint framework, you'll build momentum through consistent small wins, access curated educational 
            resources, and receive guidance for turning your new skills into actual income.
          </p>

          <h2>Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div className="bg-secondary p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Action Over Perfection</h3>
              <p className="text-muted-foreground">
                We believe in starting before you're ready and learning through doing.
              </p>
            </div>
            
            <div className="bg-secondary p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Daily Wins</h3>
              <p className="text-muted-foreground">
                We celebrate small daily accomplishments that build into significant achievements.
              </p>
            </div>
            
            <div className="bg-secondary p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Building in Public</h3>
              <p className="text-muted-foreground">
                We encourage sharing your journey to accelerate learning and create opportunities.
              </p>
            </div>
            
            <div className="bg-secondary p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Learn → Launch → Earn</h3>
              <p className="text-muted-foreground">
                We promote this virtuous cycle as the path to sustainable skill development.
              </p>
            </div>
          </div>

          <h2>Who We Serve</h2>
          <p>
            SkillSprint is designed for teens, college students, and early career professionals who want to:
          </p>
          <ul>
            <li>Learn practical skills that can generate income</li>
            <li>Break through analysis paralysis and start taking action</li>
            <li>Create portfolio-worthy projects and side hustles</li>
            <li>Build confidence through structured guidance and achievement</li>
          </ul>

          <h2>Join Our Community</h2>
          <p>
            SkillSprint is more than a learning platform—it's a community of action-takers. Join us to connect with 
            other learners, share your progress, and celebrate your wins along the journey.
          </p>
        </div>

        <div className="mt-12 text-center">
          <Button asChild size="lg" className="bg-skillpurple-400 hover:bg-skillpurple-500">
            <Link to="/challenges">Start Your Skill Sprint</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default About;
