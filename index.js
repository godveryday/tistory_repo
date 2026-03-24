import fs from "fs";
import Parser from "rss-parser";

const parser = new Parser({
  headers: {
    "User-Agent": "Mozilla/5.0",
    "Accept": "application/rss+xml, application/xml, text/xml"
  }
});

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
    console.error("에러:", err);
    process.exit(1);
  }
})();
