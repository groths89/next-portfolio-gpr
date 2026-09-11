export default {
  name: 'post',
  title: 'Blog Posts',
  type: 'document',
  fields: [
    { name: 'title', type: 'string' },
    { 
      name: 'section', 
      type: 'string', 
      title: 'Newspaper Section',
      options: { list: ['Technology', 'Sports', 'Opinion', 'Lifestyle'] } 
    },
    { name: 'body', type: 'array', of: [{ type: 'block' }] },
    { name: 'tags', type: 'array', of: [{ type: 'string' }] },
  ]
}