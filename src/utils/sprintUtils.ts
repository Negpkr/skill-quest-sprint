
import { supabase } from "@/integrations/supabase/client";

/**
 * Find a sprint ID by its slug
 * @param slug - The sprint slug to search for
 * @returns The sprint ID if found, or undefined
 */
export const findSprintIdBySlug = async (slug: string): Promise<string | undefined> => {
  try {
    if (!slug) return undefined;
    
    // Clean up the slug to handle potential URL issues
    const cleanSlug = slug.trim().toLowerCase();
    
    const { data, error } = await supabase
      .from('sprints')
      .select('id')
      .eq('slug', cleanSlug)
      .maybeSingle();
    
    if (error) {
      console.error("Error finding sprint by slug:", error);
      return undefined;
    }
    
    return data?.id;
  } catch (error) {
    console.error("Exception finding sprint by slug:", error);
    return undefined;
  }
};

/**
 * Parse resources string into an array of resource objects
 * @param resourcesStr - The resources string to parse
 * @returns An array of resource objects with title and url properties
 */
export const parseResources = (resourcesStr: string | null): { title: string, url: string }[] => {
  if (!resourcesStr) return [];
  
  try {
    // First try parsing as JSON
    try {
      const jsonData = JSON.parse(resourcesStr);
      if (Array.isArray(jsonData)) {
        return jsonData.map(item => ({
          title: item.title || 'Resource',
          url: item.url || '#'
        }));
      }
    } catch (e) {
      // Not valid JSON, continue with other parsing methods
    }
    
    // Try parsing as a simple line-by-line format
    // Format: "Title | URL" on each line
    return resourcesStr.split('\n')
      .filter(line => line.trim() && line.includes('|'))
      .map(line => {
        const [title, url] = line.split('|').map(s => s.trim());
        return {
          title: title || 'Resource',
          url: url || '#'
        };
      });
  } catch (error) {
    console.error("Error parsing resources:", error);
    return [];
  }
};
