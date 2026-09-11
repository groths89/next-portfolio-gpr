export interface GroupedTags {
  [group: string]: string[];
}

export function getGroupedTags(post: any): GroupedTags {
  const grouped: GroupedTags = {};

  //WordPress retuens embedded taxonomies in _embedded['wp:term']
  const terms = post?._embedded?.['wp:term'] || [];

  // Flatten all terms and filter for 'post_tag'
  const tags = terms.flat().filter((term: any) => term.taxonomy === 'post_tag');

  tags.forEach((tag: { name: string }) => {
    if (tag.name.includes(':')) {
      // Split "tech:astro" into group "tech" and value "astro"
      const [group, ...valueParts] = tag.name.split(':');
      const value = valueParts.join(':').trim();
      const groupKey = group.toLowerCase().trim();

      if (!grouped[groupKey]) {
        grouped[groupKey] = [];
      }
      grouped[groupKey].push(value);
    } else {
      // Fallback group for standard tags without a prefix
      if (!grouped['general']) {
        grouped['general'] = [];
      }
      grouped['general'].push(tag.name.trim());
    }
  })
  
  return grouped;
 }