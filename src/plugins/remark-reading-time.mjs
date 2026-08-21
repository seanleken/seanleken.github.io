import getReadingTime from "reading-time";
import { toString } from "mdast-util-to-string";

export function remarkReadingTime() {
  return function (tree, { data }) {
    const textOnPage = toString(tree);
    data.astro.frontmatter.readingTime = getReadingTime(textOnPage).text;
  };
}
