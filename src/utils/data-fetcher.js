import fs from 'fs/promises';
import path from 'path';

const contentDirectory = path.join(process.cwd(), 'cms');

export async function getCategories() {
  const filePath = path.join(contentDirectory, 'categories.json');
  try {
    const fileContents = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    return data;
  } catch (error) {
    console.error(`Error reading categories data:`, error);
    return { categories: [] };
  }
}
