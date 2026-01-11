import type { ArticleResult, ImageNamingResult, OutlineResult } from '@/lib/types';

export interface AIProvider {
  generateOutline: (input: {
    keyword: string;
    secondaryKeywords: string[];
    intent: string;
    industry: string;
    tone: string;
    language: string;
    wordRange: string;
  }) => Promise<OutlineResult>;
  generateArticle: (input: {
    outline: OutlineResult;
    keyword: string;
    secondaryKeywords: string[];
    intent: string;
    industry: string;
    tone: string;
    language: string;
    wordRange: string;
  }) => Promise<ArticleResult>;
  rewriteSelection: (input: {
    text: string;
    instruction: string;
    industry: string;
    tone: string;
    language: string;
  }) => Promise<string>;
  generateImageNaming: (input: {
    keyword: string;
    context: string;
  }) => Promise<ImageNamingResult>;
}

export class MockAIProvider implements AIProvider {
  // Mock provider returns deterministic scaffolds so the app runs without external AI keys.
  async generateOutline(input: {
    keyword: string;
    secondaryKeywords: string[];
    intent: string;
    industry: string;
    tone: string;
    language: string;
    wordRange: string;
  }): Promise<OutlineResult> {
    return {
      h1: `${input.keyword} strategy for ${input.industry}`,
      sections: [
        { h2: `Why ${input.keyword} matters`, h3: ['Market context', 'Operational impact'] },
        { h2: 'Implementation roadmap', h3: ['Stakeholder alignment', 'Technology stack', 'KPIs'] }
      ],
      faq_questions: [
        `How long does ${input.keyword} take to implement?`,
        `What budget is typical for ${input.industry} teams?`
      ],
      internal_link_anchors: ['case study', 'service overview', 'contact our team']
    };
  }

  async generateArticle(input: {
    outline: OutlineResult;
    keyword: string;
    secondaryKeywords: string[];
    intent: string;
    industry: string;
    tone: string;
    language: string;
    wordRange: string;
  }): Promise<ArticleResult> {
    const sectionMarkdown = input.outline.sections
      .map((section) => {
        const h3 = section.h3.map((item) => `### ${item}\nDetail this section with pragmatic guidance.`).join('\n\n');
        return `## ${section.h2}\n${h3}`;
      })
      .join('\n\n');

    const markdown = `meta_title: ${input.keyword} guide for ${input.industry} teams\nmeta_description: Practical overview of ${input.keyword} for ${input.industry} decision makers.\n\n# ${input.outline.h1}\n\n${sectionMarkdown}\n\n## FAQs\n${input.outline.faq_questions.map((q) => `**${q}**\nAnswer with concise, factual guidance.`).join('\n\n')}`;

    return {
      markdown,
      meta_title: `${input.keyword} guide for ${input.industry} teams`,
      meta_description: `Practical overview of ${input.keyword} for ${input.industry} decision makers.`,
      faq_schema_jsonld: {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: input.outline.faq_questions.map((question) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Answer with concise, factual guidance.'
          }
        }))
      }
    };
  }

  async rewriteSelection(input: {
    text: string;
    instruction: string;
    industry: string;
    tone: string;
    language: string;
  }): Promise<string> {
    return `${input.text}\n\nRewrite note: ${input.instruction} (tone: ${input.tone}).`;
  }

  async generateImageNaming(input: { keyword: string; context: string }): Promise<ImageNamingResult> {
    return {
      filename_slug: `${input.keyword.toLowerCase().replace(/\s+/g, '-')}-${input.context}`,
      alt_text: `${input.keyword} ${input.context} visual for B2B audiences`,
      title_text: `${input.keyword} ${input.context} image`
    };
  }
}

export function getAIProvider(): AIProvider {
  return new MockAIProvider();
}
