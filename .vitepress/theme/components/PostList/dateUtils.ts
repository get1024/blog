import { ContentData } from "vitepress";

// 日期结构接口
export interface DateComponents {
    year: number;
    month: string;
    day: string;
    hour: string;
    minute: string;
    second: string;
}

// 文章接口定义
export interface Post {
    url: string;
    frontmatter: {
        title: string;
        tags?: string[];
        createAt: DateComponents;
        updateAt: DateComponents;
    };
}

// 日期处理函数：将日期字符串转换为结构化对象
export function splitDate(dateStr: string | Date): DateComponents {
    const date = new Date(dateStr);
    return {
        year: date.getUTCFullYear(),
        month: (date.getUTCMonth() + 1).toString().padStart(2, "0"),
        day: date.getUTCDate().toString().padStart(2, "0"),
        hour: date.getUTCHours().toString().padStart(2, "0"),
        minute: date.getUTCMinutes().toString().padStart(2, "0"),
        second: date.getUTCSeconds().toString().padStart(2, "0"),
    };
}

// 处理原始文章数据的函数
export function processPost(post: ContentData): Post {
    return {
        url: post.url,
        frontmatter: {
            title: post.frontmatter.title,
            tags: post.frontmatter.tags,
            createAt: splitDate(post.frontmatter.createAt),
            updateAt: splitDate(post.frontmatter.updateAt),
        },
    };
}

// 获取日期的时间戳数值
export function getDateValue(d: DateComponents): number {
    return new Date(
        `${d.year}-${d.month}-${d.day}T${d.hour}:${d.minute}:${d.second}Z`
    ).getTime();
}

// 格式化日期显示
export function formatDate(d: DateComponents): string {
    return `${d.year}.${d.month}.${d.day} ${d.hour}:${d.minute}:${d.second}`;
}

// 按日期排序的函数 (降序)
export function sortPostsByDate(posts: Post[]): Post[] {
    return posts.sort((a, b) => {
        return getDateValue(b.frontmatter.createAt) - getDateValue(a.frontmatter.createAt);
    });
}
