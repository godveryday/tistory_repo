import { writeFileSync } from "node:fs";
import Parser from "rss-parser";

const parser = new Parser({
  headers: {
    Accept: "application/rss+xml, application/xml, text/xml; q=0.1",
  },
});

(async () => {
  const feed = await parser.parseURL("https://godveryday.tistory.com/rss");

  let text = `# Hi there

## Latest Blog Posts

`;

  const items = feed.items || [];
  const maxItems = Math.min(items.length, 10);

  for (let i = 0; i < maxItems; i++) {
    const { title, link } = items[i];
    text += `- [${title}](${link})\n`;
  }

  writeFileSync("README.md", text, "utf8");
  console.log("README 업데이트 완료");
})();
