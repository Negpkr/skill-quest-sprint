
/**
 * Parse resources string (JSON format) into an array of resource objects
 */
export const parseResources = (resourcesString: string): { title: string; url: string }[] => {
  if (!resourcesString) return [];
  
  try {
    const parsedResources = JSON.parse(resourcesString);
    if (Array.isArray(parsedResources)) {
      return parsedResources;
    }
    return [];
  } catch (error) {
    console.error('Error parsing resources:', error);
    return [];
  }
};

/**
 * Find a sprint ID by its slug
 */
export const findSprintIdBySlug = (slug: string | undefined, sprints: any[]): string | undefined => {
  if (!slug || !sprints || !sprints.length) return undefined;
  
  const sprint = sprints.find(s => s.slug === slug);
  return sprint?.id;
};
