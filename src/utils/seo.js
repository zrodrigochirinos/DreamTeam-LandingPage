/**
 * SEO utilities for the DreamTeam website
 */

/**
 * Update document title
 * @param {string} title - Page title
 * @param {string} suffix - Title suffix (default: site name)
 */
export const updateTitle = (title, suffix = 'Equipo de Voley') => {
  document.title = title ? `${title} | ${suffix}` : suffix;
};

/**
 * Update meta description
 * @param {string} description - Meta description content
 */
export const updateMetaDescription = (description) => {
  let metaDescription = document.querySelector('meta[name="description"]');
  
  if (!metaDescription) {
    metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    document.head.appendChild(metaDescription);
  }
  
  metaDescription.content = description;
};

/**
 * Update Open Graph meta tags
 * @param {Object} ogData - Open Graph data
 */
export const updateOpenGraph = (ogData) => {
  const ogTags = {
    'og:title': ogData.title,
    'og:description': ogData.description,
    'og:image': ogData.image,
    'og:url': ogData.url,
    'og:type': ogData.type || 'website'
  };

  Object.entries(ogTags).forEach(([property, content]) => {
    if (!content) return;
    
    let metaTag = document.querySelector(`meta[property="${property}"]`);
    
    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.setAttribute('property', property);
      document.head.appendChild(metaTag);
    }
    
    metaTag.content = content;
  });
};

/**
 * Update Twitter Card meta tags
 * @param {Object} twitterData - Twitter Card data
 */
export const updateTwitterCard = (twitterData) => {
  const twitterTags = {
    'twitter:card': twitterData.card || 'summary_large_image',
    'twitter:title': twitterData.title,
    'twitter:description': twitterData.description,
    'twitter:image': twitterData.image,
    'twitter:url': twitterData.url
  };

  Object.entries(twitterTags).forEach(([name, content]) => {
    if (!content) return;
    
    let metaTag = document.querySelector(`meta[name="${name}"]`);
    
    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.name = name;
      document.head.appendChild(metaTag);
    }
    
    metaTag.content = content;
  });
};

/**
 * Add structured data (JSON-LD)
 * @param {Object} structuredData - Structured data object
 * @param {string} id - Unique identifier for the script tag
 */
export const addStructuredData = (structuredData, id = 'structured-data') => {
  // Remove existing structured data with same ID
  const existingScript = document.getElementById(id);
  if (existingScript) {
    existingScript.remove();
  }

  const script = document.createElement('script');
  script.id = id;
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(structuredData);
  document.head.appendChild(script);
};

/**
 * Generate SportsTeam structured data
 * @param {Object} teamData - Team information
 * @returns {Object} - Structured data object
 */
export const generateSportsTeamSchema = (teamData = {}) => {
  return {
    "@context": "https://schema.org",
    "@type": "SportsTeam",
    "name": teamData.name || "DreamTeam",
    "sport": teamData.sport || "Volleyball",
    "foundingDate": teamData.foundingDate || "2020",
    "description": teamData.description || "Equipo de Voley profesional dedicado a la excelencia deportiva y la competición de alto nivel.",
    "url": teamData.url || window.location.origin,
    "logo": teamData.logo || `${window.location.origin}/images/logo.png`,
    "image": teamData.image || `${window.location.origin}/images/team-photo.jpg`,
    "memberOf": {
      "@type": "SportsOrganization",
      "name": teamData.league || "Liga Nacional de Voley"
    },
    "location": {
      "@type": "Place",
      "name": teamData.venueName || "Centro Deportivo DreamTeam",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": teamData.country || "ES"
      }
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": teamData.phone || "+34-XXX-XXX-XXX",
      "contactType": "customer service",
      "email": teamData.email || "info@dreamteam-volleyball.com"
    },
    "sameAs": teamData.socialMedia || [
      "https://www.TikTok.com/",
      "https://www.instagram.com/",
      "https://www.tiktok.com/@dream_teamvoley_ofical?is_from_webapp=1&sender_device=pc"
    ]
  };
};

/**
 * Update canonical URL
 * @param {string} url - Canonical URL
 */
export const updateCanonical = (url) => {
  let canonicalLink = document.querySelector('link[rel="canonical"]');
  
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.rel = 'canonical';
    document.head.appendChild(canonicalLink);
  }
  
  canonicalLink.href = url || window.location.href;
};

/**
 * Add hreflang tags for internationalization
 * @param {Object} hreflangs - Object with language codes and URLs
 */
export const addHreflangTags = (hreflangs) => {
  // Remove existing hreflang tags
  document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(link => {
    link.remove();
  });

  Object.entries(hreflangs).forEach(([lang, url]) => {
    const link = document.createElement('link');
    link.rel = 'alternate';
    link.hreflang = lang;
    link.href = url;
    document.head.appendChild(link);
  });
};

/**
 * Generate breadcrumb structured data
 * @param {Array} breadcrumbs - Array of breadcrumb items
 * @returns {Object} - Breadcrumb structured data
 */
export const generateBreadcrumbSchema = (breadcrumbs) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  };
};

/**
 * Update all SEO meta tags for a page
 * @param {Object} seoData - Complete SEO data for the page
 */
export const updatePageSEO = (seoData) => {
  // Update title
  if (seoData.title) {
    updateTitle(seoData.title);
  }

  // Update meta description
  if (seoData.description) {
    updateMetaDescription(seoData.description);
  }

  // Update Open Graph
  if (seoData.openGraph) {
    updateOpenGraph(seoData.openGraph);
  }

  // Update Twitter Card
  if (seoData.twitter) {
    updateTwitterCard(seoData.twitter);
  }

  // Update canonical URL
  if (seoData.canonical) {
    updateCanonical(seoData.canonical);
  }

  // Add structured data
  if (seoData.structuredData) {
    addStructuredData(seoData.structuredData);
  }

  // Add breadcrumbs
  if (seoData.breadcrumbs) {
    const breadcrumbSchema = generateBreadcrumbSchema(seoData.breadcrumbs);
    addStructuredData(breadcrumbSchema, 'breadcrumb-data');
  }
};

/**
 * Default SEO data for the homepage
 */
export const defaultSEOData = {
  title: "DreamTeam - Equipo de Voley Profesional",
  description: "DreamTeam es un equipo de Voley profesional dedicado a la excelencia deportiva. Conoce nuestros jugadores, logros y próximos torneos.",
  openGraph: {
    title: "DreamTeam - Equipo de Voley Profesional",
    description: "Equipo de Voley profesional dedicado a la excelencia deportiva y la competición de alto nivel.",
    image: `${window.location.origin}/images/og-image.jpg`,
    url: window.location.href,
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "DreamTeam - Equipo de Voley Profesional",
    description: "Equipo de Voley profesional dedicado a la excelencia deportiva y la competición de alto nivel.",
    image: `${window.location.origin}/images/twitter-image.jpg`,
    url: window.location.href
  },
  canonical: window.location.href,
  structuredData: generateSportsTeamSchema()
};

export default {
  updateTitle,
  updateMetaDescription,
  updateOpenGraph,
  updateTwitterCard,
  addStructuredData,
  generateSportsTeamSchema,
  updateCanonical,
  addHreflangTags,
  generateBreadcrumbSchema,
  updatePageSEO,
  defaultSEOData
};