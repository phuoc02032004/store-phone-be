// api/seed-data.js
import { seedAll } from '../seed.js';

// This is a basic serverless function handler for Vercel/Netlify
// You might need to adjust this based on your serverless provider
export default async (req, res) => {
  // TODO: Implement security check here (e.g., check for an API key)
  // to prevent unauthorized access to your seeding function.
  // Example:
  // if (req.headers['x-api-key'] !== process.env.SEED_API_KEY) {
  //   res.status(401).send('Unauthorized');
  //   return;
  // }

  try {
    console.log('Triggering database seeding...');
    await seedAll();
    console.log('Database seeding completed.');
    res.status(200).send('Database seeding completed successfully.');
  } catch (error) {
    console.error('Error during database seeding:', error);
    res.status(500).send(`Error during database seeding: ${error.message}`);
  }
};