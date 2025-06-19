import * as fs from 'fs/promises';
import * as path from 'path';

const folderPath = 'z:'; // Shared drive or folder
const configPath = './tags.json'; // Config file with tag names
let tags: string[] = [];

// Load tags from the config file once on startup
async function loadTags() {
  try {
    const configData = await fs.readFile(configPath, 'utf-8');
    tags = JSON.parse(configData);
    console.log('Loaded Tags:', tags);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error reading tags config:', error.message);
    } else {
      console.error('Unknown error reading tags config:', error);
    }
    process.exit(1);
  }
}

// Read and display JSON files for each tag
async function readAndDisplayTags() {
  for (const tag of tags) {
    const filePath = path.join(folderPath, `${tag}.json`);
    try {
      const fileContent = await fs.readFile(filePath, 'utf-8');
      const jsonData: any = JSON.parse(fileContent); // Explicit type here

      console.log(`\n===== ${tag}.json =====`);
      console.log(JSON.stringify(jsonData, null, 2));
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Error reading file "${tag}.json":`, error.message);
      } else {
        console.error(`Unknown error reading file "${tag}.json":`, error);
      }
    }
  }
}

// Entry point
async function main() {
  await loadTags();
  await readAndDisplayTags();

  setInterval(() => {
    readAndDisplayTags();
  }, 1000);
}

main();
