import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'article',
  title: 'Newspaper Articles',
  type: 'document',
  fields: [
    defineField({
      name: 'headline',
      title: 'Main Headline',
      type: 'string',
      validation: Rule => Rule.required().max(100),
    }),
    defineField({
      name: 'volume',
      title: 'Volume',
      type: 'string',
      initialValue: 'VOL. I',
      group: 'masthead',
    }),
    defineField({
      name: 'number',
      title: 'Number',
      type: 'string',
      initialValue: 'NO. 1',
      group: 'masthead',
    }),
    defineField({
      name: 'middleSection',
      title: 'Middle Section Text',
      type: 'string',
      description: 'The text that sits between the logo (e.g., "PRICE FIVE CENTS" or a catchy motto).',
      group: 'masthead',
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: { source: 'headline', maxLength: 96 },
    }),
    defineField({
      name: 'pullQuote',
      title: 'Featured Quote',
      type: 'text',
      description: 'Optional: Large, stylized quote used for layout break-ups.',
    }),
    defineField({
      name: 'byline',
      title: 'Byline (Author)',
      type: 'string',
      initialValue: 'Gregory Rothstein',
    }),
    defineField({
      name: 'dateline',
      title: 'Dateline',
      type: 'string',
      initialValue: 'SOMERS, NY',
    }),
    defineField({
      name: 'mainImage',
      title: 'Front Page Photo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'caption', type: 'string', title: 'Photo Caption' }
      ]
    }),
    defineField({
      name: 'lede',
      title: 'The Lede',
      type: 'text',
      description: 'The opening "hook" paragraph.',
    }),
    defineField({
      name: 'content',
      title: 'Article Body',
      type: 'array',
      of: [{ type: 'block' }],
    }),

    /* --- MYSTERY / ESCAPE ROOM LOGIC --- */
    defineField({
      name: 'isClue',
      title: 'Contains Hidden Clue?',
      type: 'boolean',
      initialValue: false,
      description: 'Toggle this if the article contains a secret for the user to find.',
    }),
    defineField({
      name: 'clueKey',
      title: 'Secret Keyphrase',
      type: 'string',
      description: 'The word or code the user needs to find/input (e.g., "REDLINE").',
      hidden: ({ document }) => !document?.isClue,
    }),
    defineField({
      name: 'mysteryEffect',
      title: 'Unlock Effect',
      type: 'string',
      options: {
        list: [
          { title: 'Reveal Hidden Link', value: 'reveal' },
          { title: 'Shake Page', value: 'shake' },
          { title: 'Confidential Stamp Overlay', value: 'stamp' },
        ]
      },
      hidden: ({ document }) => !document?.isClue,
    }),

    defineField({
      name: 'publishedAt',
      title: 'Edition Date',
      type: 'datetime',
    }),
  ],
  // Organizes fields into tabs in Sanity Studio for a cleaner look
  groups: [
    { name: 'masthead', title: 'Masthead Info' },
  ],
})