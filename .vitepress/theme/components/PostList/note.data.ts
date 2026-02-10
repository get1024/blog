import { createContentLoader } from "vitepress";
import { processPost, sortPostsByDate, Post } from "./dateUtils";

// Helper function to group posts by year
function groupByYear(posts: Post[]) {
    return posts.reduce((acc, post) => {
        const year = post.frontmatter.createAt.year;
        if (!acc[year]) {
            acc[year] = [];
        }
        acc[year].push(post);
        return acc;
    }, {} as Record<number, Post[]>);
}

export default createContentLoader("docs/**/*.md", {
    transform(rawPosts) {
        // Process posts
        const processedPosts = rawPosts.map(processPost);
        // Sort by date (descending) before grouping
        const sortedPosts = sortPostsByDate(processedPosts);
        // Group by year
        return groupByYear(sortedPosts);
    },
});
