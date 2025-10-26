/**
 * ContentParser - Safe extraction of knowledge from source files
 *
 * This parser only READS files and extracts structured information
 * without modifying any source code. Completely safe and non-destructive.
 */

import fs from 'fs';
import path from 'path';
import { ContentChunk, KnowledgeVector } from '../types/vector';

export class SmartContentParser {
  private static readonly CHUNK_SIZE = 800; // tokens (roughly 600-800 words)
  private static readonly MIN_CHUNK_SIZE = 50; // Minimum meaningful chunk size

  /**
   * Parse a TypeScript/JavaScript file and extract knowledge chunks
   */
  static parseFile(filePath: string): ContentChunk[] {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      return this.extractChunks(content, filePath);
    } catch (error) {
      console.error(`❌ Error parsing file ${filePath}:`, error);
      return [];
    }
  }

  /**
   * Extract meaningful chunks from file content
   */
  private static extractChunks(content: string, filePath: string): ContentChunk[] {
    // Clean and normalize content
    const cleanContent = this.cleanContent(content);

    if (cleanContent.length < this.MIN_CHUNK_SIZE) {
      return [];
    }

    // Split into chunks
    const chunks = this.splitIntoChunks(cleanContent);

    return chunks.map((chunk, index) => ({
      content: chunk,
      tokens: this.estimateTokens(chunk),
      metadata: {
        source: filePath,
        type: this.detectContentType(filePath, chunk),
        filePath,
        chunkIndex: index,
        updatedAt: new Date()
      }
    }));
  }

  /**
   * Clean content by removing code artifacts but preserving meaning
   */
  private static cleanContent(content: string): string {
    return content
      // Remove import statements
      .replace(/import.*from.*['"];?/g, '')
      // Remove export statements
      .replace(/export.*{[^}]*}/g, '')
      // Remove TypeScript types and interfaces (but keep descriptions)
      .replace(/interface\s+\w+[^}]*}/g, '')
      .replace(/type\s+\w+[^}]*}/g, '')
      // Remove comments (single and multi-line)
      .replace(/\/\/.*$/gm, '')
      .replace(/\/\*[\s\S]*?\*\//g, '')
      // Remove empty lines and normalize whitespace
      .replace(/^\s*[\r\n]/gm, ' ')
      .replace(/\s+/g, ' ')
      // Remove file paths and URLs (preserve company info)
      .replace(/https?:\/\/[^\s]+/g, '[URL]')
      .replace(/['"]\/[^'"]*['"]/g, '[PATH]')
      // Remove code-specific syntax but keep readable text
      .replace(/[{}();,]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  /**
   * Split content into intelligent chunks
   */
  private static splitIntoChunks(content: string): string[] {
    const words = content.split(/\s+/);
    const chunks: string[] = [];

    for (let i = 0; i < words.length; i += this.CHUNK_SIZE) {
      const chunk = words.slice(i, i + this.CHUNK_SIZE).join(' ');

      if (chunk.length >= this.MIN_CHUNK_SIZE) {
        chunks.push(chunk);
      }
    }

    return chunks;
  }

  /**
   * Detect content type based on file path and content
   */
  private static detectContentType(filePath: string, content: string): KnowledgeVector['metadata']['type'] {
    const fileName = path.basename(filePath).toLowerCase();
    const contentLower = content.toLowerCase();

    // Company information
    if (fileName.includes('aboutus') || fileName.includes('about') ||
        contentLower.includes('company') || contentLower.includes('founded') ||
        contentLower.includes('headquarters') || contentLower.includes('employees')) {
      return 'company_info';
    }

    // FAQ content
    if (fileName.includes('faq') || fileName.includes('question') ||
        (contentLower.includes('question') && contentLower.includes('answer'))) {
      return 'faq_content';
    }

    // Process and workflow content
    if (fileName.includes('process') || fileName.includes('step') ||
        contentLower.includes('step') || contentLower.includes('process') ||
        contentLower.includes('workflow')) {
      return 'process_content';
    }

    // Knowledge base content
    if (fileName.includes('knowledge') || fileName.includes('prompt') ||
        contentLower.includes('mission') || contentLower.includes('personality')) {
      return 'knowledge_base';
    }

    // Default to general content
    return 'general_content';
  }

  /**
   * Estimate token count (rough approximation)
   */
  private static estimateTokens(text: string): number {
    // Rough approximation: 1 token ≈ 4 characters for English text
    return Math.ceil(text.length / 4);
  }

  /**
   * Extract specific data types from content
   */
  static extractStructuredData(content: string): {
    statistics: Array<{ key: string; value: string }>;
    faqs: Array<{ question: string; answer: string }>;
    processes: Array<{ step: number; title: string; description: string }>;
  } {
    return {
      statistics: this.extractStatistics(content),
      faqs: this.extractFAQs(content),
      processes: this.extractProcesses(content)
    };
  }

  private static extractStatistics(content: string): Array<{ key: string; value: string }> {
    const stats: Array<{ key: string; value: string }> = [];

    // Extract common statistical patterns
    const patterns = [
      { pattern: /customersServed:\s*['"]([^'"]+)['"]/g, key: 'customers' },
      { pattern: /totalPayouts:\s*['"]([^'"]+)['"]/g, key: 'payouts' },
      { pattern: /averageRating:\s*['"]([^'"]+)['"]/g, key: 'rating' },
      { pattern: /processingTime:\s*['"]([^'"]+)['"]/g, key: 'processing_time' },
      { pattern: /statesLicensed:\s*['"]([^'"]+)['"]/g, key: 'states' },
      { pattern: /employees:\s*['"]([^'"]+)['"]/g, key: 'employees' }
    ];

    patterns.forEach(({ pattern, key }) => {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        stats.push({ key, value: match[1] });
      }
    });

    return stats;
  }

  private static extractFAQs(content: string): Array<{ question: string; answer: string }> {
    const faqs: Array<{ question: string; answer: string }> = [];

    // Look for FAQ patterns in data structures
    const faqMatches = content.match(/question:\s*['"]([^'"]+)['"].*?answer:\s*['"]([^'"]+)['"]/g);

    if (faqMatches) {
      faqMatches.forEach(match => {
        const questionMatch = match.match(/question:\s*['"]([^'"]+)['"]/);
        const answerMatch = match.match(/answer:\s*['"]([^'"]+)['"]/);

        if (questionMatch && answerMatch) {
          faqs.push({
            question: questionMatch[1],
            answer: answerMatch[1]
          });
        }
      });
    }

    return faqs;
  }

  private static extractProcesses(content: string): Array<{ step: number; title: string; description: string }> {
    const processes: Array<{ step: number; title: string; description: string }> = [];

    // Look for process step patterns
    const stepMatches = content.match(/stepNumber:\s*(\d+).*?title:\s*['"]([^'"]+)['"].*?description:\s*['"]([^'"]+)['"]/g);

    if (stepMatches) {
      stepMatches.forEach(match => {
        const stepMatch = match.match(/stepNumber:\s*(\d+)/);
        const titleMatch = match.match(/title:\s*['"]([^'"]+)['"]/);
        const descMatch = match.match(/description:\s*['"]([^'"]+)['"]/);

        if (stepMatch && titleMatch && descMatch) {
          processes.push({
            step: parseInt(stepMatch[1]),
            title: titleMatch[1],
            description: descMatch[1]
          });
        }
      });
    }

    return processes;
  }

  /**
   * Validate that a file should be indexed
   */
  static shouldIndexFile(filePath: string): boolean {
    const ext = path.extname(filePath);

    // Only index TypeScript and JavaScript files with content
    if (!['.ts', '.tsx', '.js', '.jsx'].includes(ext)) {
      return false;
    }

    // Skip test files and configuration files
    const fileName = path.basename(filePath).toLowerCase();
    if (fileName.includes('test') || fileName.includes('spec') ||
        fileName.includes('config') || fileName.includes('.d.ts')) {
      return false;
    }

    // Skip node_modules, .git, etc.
    if (filePath.includes('node_modules') || filePath.includes('.git') ||
        filePath.includes('.next') || filePath.includes('dist')) {
      return false;
    }

    return true;
  }

  /**
   * Get content type priority for search ranking
   */
  static getContentTypePriority(type: KnowledgeVector['metadata']['type']): number {
    const priorities = {
      'company_info': 10,
      'faq_content': 8,
      'process_content': 7,
      'knowledge_base': 6,
      'general_content': 4
    };

    return priorities[type] || 1;
  }
}
