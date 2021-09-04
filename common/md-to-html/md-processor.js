import { readSync } from 'to-vfile'
import remark from 'remark';
import html from 'remark-html';
import remarkImages from 'remark-images';


export default async function markdownToHtml(markdownContent, filePath) {
    const file = readSync(filePath);
    await remark().use(remarkImages).process(file);
    const result = await remark().use(html).process(markdownContent)
    return result.toString()
}