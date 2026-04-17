import { ProductData } from '../types/product-showcase';

export const productsData: ProductData[] = [
  {
    id: 'p1',
    slug: 'logia-ai-audit',
    canvasConfig: {
      backgroundColor: 'transparent',
      accentColor: '#0ea5e9',
      textColor: '#d4d4d8',
      fontFamily: 'var(--font-sans)',
      padding: '1rem',
    },
    layoutType: 'split-left',
    blocks: [
      { id: 'b1', type: 'heading', text: 'Logia AI Enterprise Audit', level: 2, className: 'text-3xl md:text-5xl font-serif font-normal tracking-tight mb-6 text-white' },
      { id: 'b2', type: 'text', text: 'The first AI-powered Governance, Risk, and Compliance (GRC) platform designed to close the "Audit Black Hole". This system directly connects your corporate SOP documents to live, real-time ERP data.', className: 'text-base md:text-xl mb-8 font-light leading-relaxed text-brand-gray' },
      { id: 'b3', type: 'list', items: [
        'Real-time Assurance: 100% audit verification in minutes.',
        'Autonomous Semantic Layer: Maps complex ERP structures.',
        'Risk Mitigation: Predictive identifies compliance gaps.'
      ], icons: ['Shield', 'Database', 'Lock'], className: 'grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12 text-brand-offwhite' },
      { id: 'b5', type: 'media', mediaType: 'image', url: '/audit.png', alt: 'Audit Dashboard', className: 'w-full' },
      { id: 'b4', type: 'button', label: 'Visit logia-initiative.com', url: 'https://logia-initiative.com', variant: 'primary' }
    ]
  },
  {
    id: 'p2',
    slug: 'agentic-workflow-engine',
    canvasConfig: {
      backgroundColor: 'transparent',
      accentColor: '#0ea5e9',
      textColor: '#d4d4d8',
      fontFamily: 'var(--font-sans)',
      padding: '1rem',
    },
    layoutType: 'split-right',
    blocks: [
      { id: 'b1', type: 'heading', text: 'Agentic Workflow Engine', level: 2, className: 'text-3xl md:text-5xl font-serif font-normal tracking-tight mb-6 text-white' },
      { id: 'b2', type: 'text', text: 'Deploy autonomous digital workforces that handle complex multi-step operations. From automated code reviews to predictive supply chain management.', className: 'text-base md:text-xl mb-8 font-light leading-relaxed text-brand-gray' },
      { id: 'b3', type: 'list', items: [
        'Self-Healing Pipelines: AI agents fix broken workflows.',
        'Multi-Agent Collaboration: Specialized agents working in sync.',
        'Zero-Latency Execution: Real-time decision making.'
      ], icons: ['Zap', 'Cpu', 'Activity'], className: 'grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12 text-brand-offwhite' },
      { id: 'b5', type: 'media', mediaType: 'image', url: '/agent.png', alt: 'Workflow Engine', className: 'w-full' },
      { id: 'b4', type: 'button', label: 'Explore Engine', url: '#', variant: 'secondary' }
    ]
  }
];
