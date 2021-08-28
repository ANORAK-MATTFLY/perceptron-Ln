import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';


export const getAllPost = () => {
    // getting the markdown files going from the root directory
    const markdownFilesPath = path.join(process.cwd(), '_markdowns');
    const markdownFiles = fs.readdirSync(markdownFilesPath);

    return markdownFiles.map(fileName => {
        const slug = fileName.replace(".md", "");
        const fileContents = fs.readFileSync(path.join(markdownFilesPath, fileName), 'utf8');
        const { data, content } = matter(fileContents);
        return { data, content, slug };
    });
}