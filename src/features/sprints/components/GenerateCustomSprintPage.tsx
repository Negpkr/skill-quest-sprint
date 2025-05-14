
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import AIPromptFlow from "@/components/AIPromptFlow";

const formSchema = z.object({
  skill: z.string().min(2, {
    message: "Skill name must be at least 2 characters.",
  }),
});

const GenerateCustomSprint: React.FC = () => {
  const [submittedSkill, setSubmittedSkill] = useState<string | null>(null);
  const navigate = useNavigate();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      skill: "",
    },
  });
  
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setSubmittedSkill(values.skill);
  };
  
  if (submittedSkill) {
    return <AIPromptFlow skill={submittedSkill} onComplete={() => navigate('/dashboard')} />;
  }
  
  return (
    <Layout>
      <div className="bg-secondary py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Generate Your Custom Sprint</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Tell us what skill you want to learn, and our AI will create a personalized 30-day challenge for you
          </p>
        </div>
      </div>
      
      <div className="max-w-md mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="skill"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What skill do you want to learn?</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., Photography, Canva Design, Social Media Marketing" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full bg-skillpurple-400 hover:bg-skillpurple-500"
            >
              Generate My 30-Day Plan
            </Button>
          </form>
        </Form>
        
        <div className="mt-8 space-y-4 text-muted-foreground">
          <p className="text-sm">
            <strong>How it works:</strong> Our AI analyzes your skill and creates a 
            custom 30-day challenge with daily micro-tasks designed to help you learn 
            effectively and create something valuable by the end.
          </p>
          
          <p className="text-sm">
            Some popular skills our users are learning: Photography, Podcast Creation, 
            Canva Design, Social Media Marketing, Freelance Writing
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default GenerateCustomSprint;
