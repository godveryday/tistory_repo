import fs from "fs";
import Parser from "rss-parser";

const parser = new Parser();

(async () => {
  try {
    const feed = await parser.parseURL("https://godveryday.tistory.com/rss");

    let text = `# Latest Blog Posts\n\n`;

    const items = feed.items || [];
    const maxItems = Math.min(items.length, 10);

    for (let i = 0; i < maxItems; i++) {
      const title = items[i].title || "no title";
      const link = items[i].link || "";
      text += `- [${title}](${link})\n`;
    }

    fs.writeFileSync("README.md", text);
    console.log("README 생성 완료");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
