
import React from "react";
import Layout from "../components/Layout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ: React.FC = () => {
  return (
    <Layout>
      <div className="bg-secondary py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about SkillSprint challenges, accounts, and features
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is SkillSprint?</AccordionTrigger>
            <AccordionContent>
              SkillSprint is a platform that helps beginners learn practical skills and launch side hustles through guided 30-day challenges. Our sprints break down complex skills into manageable daily micro-tasks, with clear roadmaps and guidance to help you build momentum and see results.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>How do 30-day sprints work?</AccordionTrigger>
            <AccordionContent>
              Each sprint is a 30-day guided challenge focused on a specific skill. Every day, you'll complete a small, focused task that builds toward your final goal. The platform tracks your progress, provides resources, and connects you with fellow learners working on the same challenge.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Do I need any prior experience?</AccordionTrigger>
            <AccordionContent>
              No prior experience is needed! Our sprints are designed for beginners, with clear instructions and guidance for each step. Some sprints have prerequisites or are marked as intermediate/advanced, but there's always a beginner-friendly option for each skill category.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </Layout>
  );
};

export default FAQ;
