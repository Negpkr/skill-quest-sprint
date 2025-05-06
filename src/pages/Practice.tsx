
import React from "react";
import Layout from "../components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Award, Book, PenSquare } from "lucide-react";

const Practice: React.FC = () => {
  const challenges = [1, 2, 3, 4, 5, 6];
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const fadeInUp = {
    hidden: { y: 20, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <Layout>
      <div className="bg-gradient-to-br from-neo-purple to-neo-blue py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-grid"></div>
        
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div 
            key={i} 
            className="absolute rounded-full bg-white/10"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              filter: 'blur(20px)'
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{
              duration: 5 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          />
        ))}
        
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white">Practice Your Skills</h1>
            <p className="text-white/80 text-xl max-w-2xl mx-auto">
              Strengthen your abilities with these daily exercises, quizzes, and mini-challenges.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <Tabs defaultValue="dailyChallenge" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="dailyChallenge" className="data-[state=active]:bg-neo-purple data-[state=active]:text-white">
              <Award className="w-4 h-4 mr-2" /> Daily Challenges
            </TabsTrigger>
            <TabsTrigger value="quizzes" className="data-[state=active]:bg-neo-purple data-[state=active]:text-white">
              <PenSquare className="w-4 h-4 mr-2" /> Quizzes
            </TabsTrigger>
            <TabsTrigger value="miniProjects" className="data-[state=active]:bg-neo-purple data-[state=active]:text-white">
              <Book className="w-4 h-4 mr-2" /> Mini Projects
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="dailyChallenge" className="mt-6">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              variants={staggerContainer}
              initial="hidden"
              animate="show"
            >
              {challenges.map((i) => (
                <motion.div key={i} variants={fadeInUp}>
                  <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                    <div className={`h-2 ${i % 3 === 0 ? 'bg-neo-purple' : i % 3 === 1 ? 'bg-neo-green' : 'bg-neo-orange'}`}></div>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center">
                        <span className="w-8 h-8 rounded-full mr-2 flex items-center justify-center text-white text-xs font-bold"
                          style={{
                            background: i % 3 === 0 ? 'linear-gradient(to right, #8E2DE2, #4A00E0)' : 
                                      i % 3 === 1 ? 'linear-gradient(to right, #11998e, #38ef7d)' :
                                      'linear-gradient(to right, #f46b45, #eea849)'
                          }}>
                          {i}
                        </span>
                        <span>Daily Challenge #{i}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        Complete this challenge to improve your skills and earn points.
                      </p>
                      <Button className="w-full" 
                        style={{
                          background: i % 3 === 0 ? 'linear-gradient(to right, #8E2DE2, #4A00E0)' : 
                                    i % 3 === 1 ? 'linear-gradient(to right, #11998e, #38ef7d)' :
                                    'linear-gradient(to right, #f46b45, #eea849)'
                        }}>
                        Start Challenge
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
          
          <TabsContent value="quizzes">
            <div className="py-12 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-gradient-to-r from-softpurple to-softblue p-10 rounded-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1606326608690-4e0281b1e588?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                    alt="Coming Soon" 
                    className="w-64 h-64 mx-auto object-cover rounded-full border-4 border-white mb-6 shadow-lg"
                  />
                  <h3 className="text-2xl font-bold mb-4">Quizzes Coming Soon!</h3>
                  <p className="text-lg mb-6">We're working on creating challenging quizzes to test your knowledge.</p>
                  <Button variant="outline" className="bg-white/20 text-white hover:bg-white/30">
                    Get Notified When Available
                  </Button>
                </div>
              </motion.div>
            </div>
          </TabsContent>
          
          <TabsContent value="miniProjects">
            <div className="py-12 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-gradient-to-r from-softgreen to-softblue p-10 rounded-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                    alt="Coming Soon" 
                    className="w-64 h-64 mx-auto object-cover rounded-full border-4 border-white mb-6 shadow-lg"
                  />
                  <h3 className="text-2xl font-bold mb-4">Mini Projects Coming Soon!</h3>
                  <p className="text-lg mb-6">Hands-on projects to build your portfolio will be available soon.</p>
                  <Button variant="outline" className="bg-white/20 text-white hover:bg-white/30">
                    Get Notified When Available
                  </Button>
                </div>
              </motion.div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Practice;
