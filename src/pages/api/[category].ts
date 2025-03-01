import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

interface FilePaths {
  [key: string]: string;
}

const filePaths: FilePaths = {
  technical_skills: 'technical_skills.json',
  soft_skills: 'soft_skills.json',
  experience: 'experience.json',
  education: 'education.json',
  projects: 'projects.json',
  achievements:'achievements.json'
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { category } = req.query;

  // Ensure `category` is a string
  if (Array.isArray(category)) {
    return res.status(400).json({ error: 'Invalid category format.' });
  }
console.log(category)
  const fileName = filePaths[category as string]; // `category` is guaranteed to be a string here

  if (!fileName) {
    return res.status(404).json({ error: 'Category not found.' });
  }

  const filePath = path.join(process.cwd(), 'data', fileName);

  if (req.method === 'GET') {
    try {
      const data = await fs.promises.readFile(filePath, 'utf8');
      const parsedData = JSON.parse(data);
      res.status(200).json(parsedData);
    } catch (err: any) {
      console.error(`Error reading file ${filePath}:`, err.message);
      res.status(500).json({ error: 'Error reading data.' });
    }
  } else if (req.method === 'POST') {
    try {
      const data = req.body;

      if (!data || typeof data !== 'object') {
        return res.status(400).json({ error: 'Invalid data format.' });
      }
      if(category){
        await fs.promises.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
        res.status(200).json({ message: `${category.charAt(0).toUpperCase() + category.slice(1)} saved successfully.` });
      }
      
    } catch (err: any) {
      console.error(`Error writing to file ${filePath}:`, err.message);
      res.status(500).json({ error: 'Error saving data.' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).json({ error: `Method ${req.method} not allowed.` });
  }
}
