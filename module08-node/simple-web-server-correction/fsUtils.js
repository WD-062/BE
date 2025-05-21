// import needed functions from fs/promises
import { access, mkdir, appendFile, unlink, readFile } from 'fs/promises';
// import needed function from path
import { join } from 'path';

const createFileWithMessage = async (message) => {
    try {
        // FORMAT DIRECTORY NAME (yyyy-mm-dd)
        //  get current time as new Date object
        const now = new Date();

        // format year
        const year = now.toLocaleString('default', { year: 'numeric' });
        // format month
        const month = now.toLocaleString('default', { month: '2-digit' });
        // format day
        const day = now.toLocaleString('default', { day: '2-digit' });

        // create string for directory name as year-month-day
        const dirName = `${year}-${month}-${day}`;

        // create string for file name (hh-mm-ss.txt)
        const fileName =
            now.toLocaleTimeString('de-DE').replaceAll(':', '-') + '.txt';
        // try to open directory that matches dirName
        // HINT: If you try to open a directory that doesn't exist it throws an error. You can nest try/catch blocks
        try {
            await access(dirName);
            console.log(`${dirName} exists`);
        } catch (error) {
            // if the directory doesn't exist, create  it
            await mkdir(dirName);
            console.log(`${dirName} created`);
        }

        // join the dirName and fileName to create the path
        const filePath = join(dirName, fileName);

        // create a new file, or add to end of existing file
        await appendFile(filePath, message + '\n');

        console.log(`Successfully created ${fileName}`);
    } catch (error) {
        console.error(error);
    }
};

// createFileWithMessage('I can write code in the backend too now!');
const deleteFileByName = async (filePath) => {
    try {
        // try to delete the file
        await unlink(filePath);
        console.log(`Successfully deleted ${filePath}`);
    } catch (error) {
        console.error('File not found.');
    }
};

const readFileByName = async (filePath) => {
    try {
        const fileContent = await readFile(filePath, 'utf8');
        return fileContent;
    } catch (error) {
        console.error('there was an error:', error.message);
    }
};

export { createFileWithMessage, deleteFileByName, readFileByName };
