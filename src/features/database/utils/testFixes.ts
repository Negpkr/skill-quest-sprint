import { supabase } from "@/integrations/supabase/client";

/**
 * Test contact form submission
 */
export const testContactSubmission = async () => {
  try {
    console.log("Testing contact form submission...");
    
    const testData = {
      name: "Test User",
      email: "test@example.com",
      subject: "Test Subject",
      message: "This is a test message"
    };
    
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([
        {
          name: testData.name,
          email: testData.email,
          subject: testData.subject,
          message: testData.message,
          created_at: new Date().toISOString()
        }
      ]);
    
    if (error) {
      console.error("Error submitting contact message:", error);
      return { success: false, error };
    }
    
    console.log("Contact form submission successful!");
    return { success: true, data };
  } catch (error) {
    console.error("Exception submitting contact message:", error);
    return { success: false, error };
  }
};

/**
 * Test sprint creation
 */
export const testSprintCreation = async () => {
  try {
    console.log("Testing sprint creation...");
    
    const slug = `test-sprint-${Date.now()}`;
    
    const { data, error } = await supabase
      .from('sprints')
      .insert([
        {
          title: "Test Sprint",
          slug: slug,
          description: "This is a test sprint",
          category: "Test",
          difficulty: "Beginner",
          duration: 30,
          cover_image: "https://placehold.co/600x400"
        }
      ])
      .select();
    
    if (error) {
      console.error("Error creating sprint:", error);
      return { success: false, error };
    }
    
    console.log("Sprint creation successful:", data);
    return { success: true, data };
  } catch (error) {
    console.error("Exception creating sprint:", error);
    return { success: false, error };
  }
};

/**
 * Test problem report submission
 */
export const testProblemReportSubmission = async () => {
  try {
    console.log("Testing problem report submission...");
    
    const testData = {
      issue_type: "Test Issue",
      description: "This is a test issue description",
      email: "test@example.com"
    };
    
    const { data, error } = await supabase
      .from('problem_reports')
      .insert([
        {
          issue_type: testData.issue_type,
          description: testData.description,
          email: testData.email,
          created_at: new Date().toISOString(),
          status: "new"
        }
      ]);
    
    if (error) {
      console.error("Error submitting problem report:", error);
      return { success: false, error };
    }
    
    console.log("Problem report submission successful!");
    return { success: true, data };
  } catch (error) {
    console.error("Exception submitting problem report:", error);
    return { success: false, error };
  }
};

/**
 * Run all tests
 */
export const runAllTests = async () => {
  const results = {
    contactSubmission: await testContactSubmission(),
    sprintCreation: await testSprintCreation(),
    problemReportSubmission: await testProblemReportSubmission()
  };
  
  console.log("Test results:", results);
  return results;
};

// Make the test functions available in the browser console
(window as any).testContactSubmission = testContactSubmission;
(window as any).testSprintCreation = testSprintCreation;
(window as any).testProblemReportSubmission = testProblemReportSubmission;
(window as any).runAllTests = runAllTests;

export default {
  testContactSubmission,
  testSprintCreation,
  testProblemReportSubmission,
  runAllTests
};
