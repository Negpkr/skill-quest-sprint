
// Define a mapping for string IDs to UUIDs for compatibility with mock data
export const idToUuidMap: Record<string, string> = {
  'design-starter': 'd0d766ab-5ca8-45c1-b789-500d132c8710',
  'web-dev': '08c8f5db-c37e-417d-a6a4-d10c0bb78e52',
  'freelance-launchpad': '7ead586e-49a1-4ba0-bbeb-97f6cc482170',
  'personal-brand': '7a8d9d12-441d-4fe8-a9ab-3a40ea4fb2d3',
  'productivity': '07d5fc8e-a14c-42ee-b7e9-19fb27eb4b56',
  'freelance-pro': 'd43fed60-f098-42f9-8afc-ba2c19d61b70'
};

// Helper function to find the UUID from the challenge ID mapping
export const findSprintIdBySlug = (slug: string): string | null => {
  // Check if the slug is directly in our mapping
  if (idToUuidMap[slug]) {
    return idToUuidMap[slug];
  }
  return slug; // If not found, return the original slug (it might already be a UUID)
};

// Parse resources string to JSON
export const parseResources = (resourcesStr: string | null) => {
  if (!resourcesStr) return [];
  
  try {
    return JSON.parse(resourcesStr);
  } catch (e) {
    console.error("Error parsing resources:", e);
    return [];
  }
};
