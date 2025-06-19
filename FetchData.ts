import * as fs from 'fs/promises';

async function listFilesFromSharedFolder(folderPath: string) {
  try {
    const files = await fs.readdir(folderPath);
    console.log('Files in shared folder:', files);
    return files;
  } catch (error) {
    console.error('Error listing files from shared folder:', error);
    return [];
  }
}

async function readFromSharedFolder(tag: string, folderPath: string) {
  const filePath = `${folderPath}\\${tag}.json`;
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const jsonData = JSON.parse(fileContent);
    console.log('Shared Folder Data:', jsonData);
    return jsonData;
  } catch (error) {
    console.error(`Error reading file "${tag}.json" from shared folder:`, error);
  }
}

async function main() {
  const folderPath = 'z:';  // Your shared folder or drive letter
  await listFilesFromSharedFolder(folderPath);

  const tag = 'HMI_GVL.M.Rob2.ROBOTPOS.Z';
  await readFromSharedFolder(tag, folderPath);
}

main();
