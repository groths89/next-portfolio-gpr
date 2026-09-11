import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project Ledger',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Project Title' }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'description', type: 'text', title: 'Overview' }),
    defineField({ 
      name: 'techStack', 
      type: 'array', 
      title: 'Technologies Used', 
      of: [{ type: 'string' }] 
    }),
    defineField({ name: 'repository', type: 'url', title: 'Source Code Link' }),
    defineField({ name: 'deployment', type: 'url', title: 'Live Deployment' }),
    defineField({ name: 'featuredImage', type: 'image', options: { hotspot: true } }),
  ]
})