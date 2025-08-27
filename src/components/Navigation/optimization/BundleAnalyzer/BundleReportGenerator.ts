/**
 * Bundle Report Generator
 * 
 * Generates comprehensive bundle analysis reports
 * 
 * @module BundleReportGenerator
 * @author SmarterPayouts Team
 * @since 2024
 */

import type { BundleData } from './BundleMetricsCollector';
import type { OptimizationResult } from './OptimizationScorer';

export interface ReportConfig {
  includeDetails: boolean;
  includeRecommendations: boolean;
  includeWebpackConfig: boolean;
  format: 'markdown' | 'json' | 'html';
}

export interface BundleReport {
  summary: {
    totalSize: number;
    gzippedSize: number;
    optimizationScore: number;
    compressionRatio: number;
  };
  details: BundleData;
  optimization: OptimizationResult;
  webpackConfig?: Record<string, any>;
  generatedAt: string;
}

/**
 * Bundle Report Generator
 */
export class BundleReportGenerator {
  private config: ReportConfig;

  constructor(config: Partial<ReportConfig> = {}) {
    this.config = {
      includeDetails: true,
      includeRecommendations: true,
      includeWebpackConfig: true,
      format: 'markdown',
      ...config
    };
  }

  /**
   * Generate comprehensive bundle report
   */
  generateReport(data: BundleData, optimization: OptimizationResult): BundleReport {
    const report: BundleReport = {
      summary: {
        totalSize: data.totalSize,
        gzippedSize: data.gzippedSize,
        optimizationScore: optimization.score,
        compressionRatio: Math.round((data.gzippedSize / data.totalSize) * 100)
      },
      details: data,
      optimization,
      generatedAt: new Date().toISOString()
    };

    if (this.config.includeWebpackConfig) {
      report.webpackConfig = this.generateWebpackConfig();
    }

    return report;
  }

  /**
   * Format report as string
   */
  formatReport(report: BundleReport): string {
    switch (this.config.format) {
      case 'json':
        return this.formatAsJSON(report);
      case 'html':
        return this.formatAsHTML(report);
      case 'markdown':
      default:
        return this.formatAsMarkdown(report);
    }
  }

  /**
   * Format report as Markdown
   */
  private formatAsMarkdown(report: BundleReport): string {
    const { summary, details, optimization } = report;
    
    let markdown = `# Navigation Bundle Analysis Report

## 📊 Bundle Summary
- **Total Size**: ${summary.totalSize}KB
- **Gzipped Size**: ${summary.gzippedSize}KB
- **Compression Ratio**: ${summary.compressionRatio}%
- **Optimization Score**: ${summary.optimizationScore}/100

## 🎯 Score Breakdown
- **Bundle Size**: ${optimization.breakdown.bundleSizeScore}/100
- **Unused Exports**: ${optimization.breakdown.unusedExportsScore}/100
- **Dependencies**: ${optimization.breakdown.dependenciesScore}/100
- **Compression**: ${optimization.breakdown.compressionScore}/100
`;

    if (this.config.includeRecommendations && optimization.recommendations.length > 0) {
      markdown += `
## 💡 Recommendations
${optimization.recommendations.map(rec => `- ${rec}`).join('\n')}
`;
    }

    if (this.config.includeDetails) {
      markdown += `
## 📦 Heavy Dependencies
${details.heavyDependencies.map(dep => `- **${dep.name}**: ${dep.size}KB`).join('\n')}

## 🗑️ Unused Exports
${details.unusedExports.length > 0 ? 
  details.unusedExports.map(exp => `- ${exp}`).join('\n') : 
  '- None detected 🎉'
}
`;
    }

    if (this.config.includeWebpackConfig && report.webpackConfig) {
      markdown += `
## ⚙️ Webpack Optimization Config

\`\`\`javascript
${JSON.stringify(report.webpackConfig, null, 2)}
\`\`\`
`;
    }

    markdown += `
---
*Generated at: ${report.generatedAt}*
`;

    return markdown.trim();
  }

  /**
   * Format report as JSON
   */
  private formatAsJSON(report: BundleReport): string {
    return JSON.stringify(report, null, 2);
  }

  /**
   * Format report as HTML
   */
  private formatAsHTML(report: BundleReport): string {
    const { summary, optimization } = report;
    
    return `
<!DOCTYPE html>
<html>
<head>
    <title>Navigation Bundle Analysis Report</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 40px; }
        .header { color: #1f2937; border-bottom: 2px solid #e5e7eb; padding-bottom: 20px; }
        .metric { background: #f9fafb; padding: 15px; margin: 10px 0; border-radius: 8px; }
        .score { font-size: 24px; font-weight: bold; color: ${optimization.score >= 80 ? '#10b981' : optimization.score >= 60 ? '#f59e0b' : '#ef4444'}; }
        .recommendations { background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0; }
        .code { background: #1f2937; color: #f9fafb; padding: 15px; border-radius: 8px; overflow-x: auto; }
    </style>
</head>
<body>
    <div class="header">
        <h1>📊 Navigation Bundle Analysis Report</h1>
        <p>Generated at: ${report.generatedAt}</p>
    </div>
    
    <div class="metric">
        <h2>Bundle Summary</h2>
        <p><strong>Total Size:</strong> ${summary.totalSize}KB</p>
        <p><strong>Gzipped Size:</strong> ${summary.gzippedSize}KB</p>
        <p><strong>Compression Ratio:</strong> ${summary.compressionRatio}%</p>
        <p><strong>Optimization Score:</strong> <span class="score">${summary.optimizationScore}/100</span></p>
    </div>
    
    ${this.config.includeRecommendations ? `
    <div class="recommendations">
        <h2>💡 Recommendations</h2>
        <ul>
            ${optimization.recommendations.map(rec => `<li>${rec}</li>`).join('')}
        </ul>
    </div>
    ` : ''}
    
    ${this.config.includeWebpackConfig && report.webpackConfig ? `
    <div class="code">
        <h2>⚙️ Webpack Configuration</h2>
        <pre>${JSON.stringify(report.webpackConfig, null, 2)}</pre>
    </div>
    ` : ''}
</body>
</html>
    `.trim();
  }

  /**
   * Generate webpack optimization configuration
   */
  private generateWebpackConfig(): Record<string, any> {
    return {
      optimization: {
        usedExports: true,
        sideEffects: false,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            navigation: {
              name: 'navigation',
              test: /[\\/]Navigation[\\/]/,
              priority: 10,
              reuseExistingChunk: true
            }
          }
        }
      },
      resolve: {
        alias: {
          '@navigation': './src/components/Navigation'
        }
      }
    };
  }

  /**
   * Update report configuration
   */
  updateConfig(config: Partial<ReportConfig>): void {
    this.config = { ...this.config, ...config };
  }

  /**
   * Get current configuration
   */
  getConfig(): ReportConfig {
    return { ...this.config };
  }
}

export default BundleReportGenerator;
