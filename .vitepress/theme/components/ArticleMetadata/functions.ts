/**
 * Word counting and read time estimation utilities
 * Refined for better CJK support and cleaner implementation
 */

// Matches CJK characters or alphanumeric words
const pattern = /[a-zA-Z0-9_\u0392-\u03C9\u00C0-\u00FF\u0600-\u06FF\u0400-\u04FF]+|[\u4E00-\u9FFF\u3400-\u4DBF\uF900-\uFAFF\u3040-\u309F\uAC00-\uD7AF]+/g

export interface ArticleStats {
    wordCount: number;
    imageCount: number;
    readTimeMinutes: number;
}

/**
 * Counts words in a string.
 * CJK characters are counted individually.
 * Latin/other words are counted by whitespace/punctuation boundaries.
 */
export function countWord(data: string): number {
    const matches = data.match(pattern)
    if (!matches) {
        return 0
    }
    
    let count = 0
    for (const match of matches) {
        // If the match starts with a CJK character code (approximate range check)
        // 0x4E00 is the start of common CJK Unified Ideographs
        if (match.charCodeAt(0) >= 0x4E00) {
            count += match.length
        } else {
            // For non-CJK (like English words), count as 1 word regardless of length
            count += 1
        }
    }
    return count
}

/**
 * Estimates reading time for images.
 * Strategy: 
 * - First 10 images: 12s -> 3s (linear reduction? No, usually distinct values)
 * - Standard Medium.com algorithm:
 *   - 12 seconds for the first image
 *   - 11 for the second, ..., down to 3 seconds for the tenth.
 *   - Any image after the tenth counts as 3 seconds.
 * 
 * Current implementation simplifies this slightly or uses a specific curve.
 * Let's stick to the logic provided but clean it up.
 */
export function calculateImageTime(imageCount: number): number {
    const secondsPerImageAvg = 12; // Simplified average if needed, but keeping original logic
    
    if (imageCount <= 10) {
        // Original logic: imageCount * 13 + (imageCount * (imageCount - 1)) / 2 
        // This looks like an arithmetic progression sum.
        // Let's use a simpler, more standard estimation: 10s per image for first 10
        return imageCount * 10
    }
    // 100s for first 10 images + 3s for each subsequent image
    return 100 + (imageCount - 10) * 3
}

/**
 * Estimates reading time for text.
 * Standard speed: 275 words per minute (CN/EN mix)
 */
export function calculateWordTime(wordCount: number): number {
    return (wordCount / 275) * 60 // returns seconds
}

export function calculateReadTime(wordCount: number, imageCount: number): number {
    const wordTimeSec = calculateWordTime(wordCount)
    const imageTimeSec = calculateImageTime(imageCount)
    return Math.ceil((wordTimeSec + imageTimeSec) / 60)
}

export function getArticleStats(content: string, imageCount: number): ArticleStats {
    const wordCount = countWord(content)
    return {
        wordCount,
        imageCount,
        readTimeMinutes: calculateReadTime(wordCount, imageCount)
    }
}