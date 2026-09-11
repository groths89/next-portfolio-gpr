export default {
  name: 'milestone',
  title: 'Career Milestones',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', title: 'Milestone Title' },
    { name: 'date', type: 'date', title: 'Date Achieved' },
    { 
      name: 'milestoneType', 
      type: 'string', 
      title: 'Category',
      options: { list: ['Professional Role', 'Certification', 'Educational', 'Technical Achievement'] } 
    },
    { name: 'description', type: 'text', title: 'Details' },
  ]
}