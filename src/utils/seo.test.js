import { describe, it, expect, beforeEach } from 'vitest';
import {
  generateSportsTeamSchema,
  updateMetaDescription,
  updateOpenGraph,
  updatePageSEO,
  addStructuredData
} from './seo';

describe('SEO utilities', () => {
  beforeEach(() => {
    document.head.innerHTML = '';
    document.title = '';
  });

  it('generates SportsTeam schema with required fields', () => {
    const schema = generateSportsTeamSchema({ name: 'DreamTeam', foundingDate: '2018' });
    expect(schema['@type']).toBe('SportsTeam');
    expect(schema.name).toBe('DreamTeam');
    expect(schema.sport).toBe('Volleyball');
    expect(schema.foundingDate).toBe('2018');
    expect(schema.memberOf).toBeDefined();
  });

  it('updates meta description in document head', () => {
    updateMetaDescription('DreamTeam Voley equipo deportes');
    const meta = document.querySelector('meta[name="description"]');
    expect(meta?.content).toContain('DreamTeam');
  });

  it('adds Open Graph tags', () => {
    updateOpenGraph({
      title: 'DreamTeam - Equipo de Voley Profesional',
      description: 'Equipo profesional',
      image: '/logoDT.png',
      url: 'https://dreamteam.com',
      type: 'website'
    });

    expect(document.querySelector('meta[property="og:title"]')?.content).toBe(
      'DreamTeam - Equipo de Voley Profesional'
    );
    expect(document.querySelector('meta[property="og:type"]')?.content).toBe('website');
  });

  it('injects structured data script', () => {
    addStructuredData({ '@type': 'SportsTeam', name: 'DreamTeam' }, 'team-schema');
    const script = document.getElementById('team-schema');
    expect(script?.type).toBe('application/ld+json');
    expect(script?.textContent).toContain('SportsTeam');
  });

  it('updatePageSEO sets title and description', () => {
    updatePageSEO({
      title: 'DreamTeam - Equipo de Voley Profesional',
      description: 'Voley equipo DreamTeam deportes',
      structuredData: generateSportsTeamSchema()
    });

    expect(document.title).toContain('DreamTeam');
    expect(document.querySelector('meta[name="description"]')?.content).toContain('DreamTeam');
  });
});
