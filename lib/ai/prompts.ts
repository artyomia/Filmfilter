export const outlinePromptTemplate = `You are an SEO strategist. Return JSON only.
Input:
- primary keyword: {{keyword}}
- secondary keywords: {{secondary_keywords}}
- intent: {{intent}}
- industry: {{industry}}
- tone: {{tone}}
- language: {{language}}
- word range: {{word_range}}

Output JSON schema:
{
  "h1": "...",
  "sections": [{"h2": "...", "h3": ["...", "..."]}],
  "faq_questions": ["..."],
  "internal_link_anchors": ["..."]
}
`;

export const articlePromptTemplate = `You are a B2B technical writer. Return markdown only.
Input:
- approved outline JSON: {{outline_json}}
- primary keyword: {{keyword}}
- secondary keywords: {{secondary_keywords}}
- intent: {{intent}}
- industry: {{industry}}
- tone: {{tone}}
- language: {{language}}
- word range: {{word_range}}

Requirements:
- Use H1 once
- Follow outline H2/H3
- Include meta_title and meta_description at top
- Provide FAQ schema JSON-LD at bottom
- Avoid hype. Keep technical B2B tone.
`;

export const rewritePromptTemplate = `Rewrite the selected text per the instruction.
Input:
- selected text: {{text}}
- instruction: {{instruction}}
- industry: {{industry}}
- tone: {{tone}}
- language: {{language}}
`;

export const imageNamingPromptTemplate = `Return JSON only.
Input:
- keyword: {{keyword}}
- image context: {{context}}

Output:
{
  "filename_slug": "...",
  "alt_text": "...",
  "title_text": "..."
}
`;
