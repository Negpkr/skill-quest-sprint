
import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";

const Profile: React.FC = () => {
  const { user } = useAuth();
  
  const getUserInitials = () => {
    if (!user) return "U";
    const name = user.user_metadata?.full_name || user.email || "";
    if (!name) return "U";
    
    if (user.user_metadata?.full_name) {
      const parts = user.user_metadata.full_name.split(' ');
      if (parts.length >= 2) {
        return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
      }
      return name.substring(0, 2).toUpperCase();
    }
    
    return user.email?.substring(0, 2).toUpperCase() || "U";
  };
  
  return (
    <Layout>
      <div className="bg-secondary py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">Your Profile</h1>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto">
            Manage your account details and track your progress
          </p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <div className="flex justify-center">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user?.user_metadata?.avatar_url} alt="Profile" />
                    <AvatarFallback className="bg-skillpurple-400 text-white text-xl">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle className="text-center mt-4">
                  {user?.user_metadata?.full_name || user?.email || "User"}
                </CardTitle>
                <CardDescription className="text-center">
                  {user?.email}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-4">
                  <div>
                    <h3 className="text-sm font-medium">Member since</h3>
                    <p className="text-sm text-muted-foreground">
                      {user?.created_at ? new Date(user.created_at).toLocaleDateString() : "N/A"}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium">Current streak</h3>
                    <div className="flex items-center mt-1">
                      <span className="text-2xl font-bold text-skillpurple-500">7</span>
                      <span className="ml-2 text-sm text-muted-foreground">days</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium">Skills</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="secondary">Design</Badge>
                      <Badge variant="secondary">Web Development</Badge>
                      <Badge variant="secondary">Freelancing</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Edit Profile</Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Active Challenges</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-md p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">Design Starter Sprint</h3>
                        <p className="text-sm text-muted-foreground">Day 12 of 30</p>
                      </div>
                      <Badge className="bg-softgreen text-green-800">40% Complete</Badge>
                    </div>
                    <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-skillpurple-400 h-2.5 rounded-full" style={{ width: "40%" }}></div>
                    </div>
                    <div className="mt-4">
                      <Button size="sm" asChild>
                        <Link to="/challenge/design-starter">Continue</Link>
                      </Button>
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">Freelance Launchpad</h3>
                        <p className="text-sm text-muted-foreground">Day 5 of 30</p>
                      </div>
                      <Badge className="bg-softgreen text-green-800">16% Complete</Badge>
                    </div>
                    <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-skillpurple-400 h-2.5 rounded-full" style={{ width: "16%" }}></div>
                    </div>
                    <div className="mt-4">
                      <Button size="sm" asChild>
                        <Link to="/challenge/freelance-starter">Continue</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Skill Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="text-sm font-medium">Design</h3>
                      <span className="text-sm text-muted-foreground">65%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: "65%" }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="text-sm font-medium">Web Development</h3>
                      <span className="text-sm text-muted-foreground">40%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: "40%" }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="text-sm font-medium">Freelancing</h3>
                      <span className="text-sm text-muted-foreground">25%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "25%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
