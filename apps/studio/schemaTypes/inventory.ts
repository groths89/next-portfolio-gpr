export default {
  name: 'inventory',
  title: 'Technical Inventory',
  type: 'document',
  fields: [
    { name: 'name', type: 'string', title: 'Technology/Skill Name' },
    { 
      name: 'category', 
      type: 'string', 
      options: { list: ['Language', 'Framework', 'Tool', 'Infrastructure', 'Skill'] } 
    },
    { 
      name: 'proficiency', 
      type: 'string', 
      options: { list: ['Learning', 'Proficient', 'Expert'] } 
    },
    { name: 'lastUsed', type: 'date', title: 'Last Utilized' },
    { name: 'documentationLink', type: 'url', title: 'Official Documentation' },
  ]
}