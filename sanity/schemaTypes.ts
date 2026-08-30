import { defineField, defineType } from 'sanity';

const imageField = (name = 'image', title = 'Image') =>
  defineField({
    name,
    title,
    type: 'image',
    options: { hotspot: true },
    fields: [
      defineField({
        name: 'alt',
        title: 'Accessible alt text',
        type: 'string',
        validation: (rule) => rule.required(),
      }),
    ],
  });

const portableText = defineField({
  name: 'body',
  type: 'array',
  of: [{ type: 'block' }],
});

export const schemaTypes = [
  defineType({
    name: 'siteSettings',
    title: 'Site settings',
    type: 'document',
    fields: [
      defineField({ name: 'title', type: 'string', initialValue: "Risosoo Travels Int'l Ltd" }),
      imageField('logo', 'Logo'),
      defineField({ name: 'phone', type: 'string' }),
      defineField({ name: 'whatsapp', type: 'string' }),
      defineField({ name: 'email', type: 'string' }),
      defineField({ name: 'address', type: 'string' }),
      defineField({ name: 'heroVideo', title: 'Hero background video (upload)', type: 'file', options: { accept: 'video/*' } }),
      imageField('heroPoster', 'Hero fallback poster'),
    ],
  }),
  defineType({
    name: 'service', title: 'Service', type: 'document',
    fields: [
      defineField({ name: 'title', type: 'string', validation: (rule) => rule.required() }),
      defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: (rule) => rule.required() }),
      defineField({ name: 'icon', type: 'string' }),
      defineField({ name: 'shortDescription', type: 'text' }),
      portableText,
    ],
  }),
  defineType({
    name: 'destination', title: 'Destination', type: 'document',
    fields: [
      defineField({ name: 'name', type: 'string', validation: (rule) => rule.required() }),
      defineField({ name: 'slug', type: 'slug', options: { source: 'name' }, validation: (rule) => rule.required() }),
      imageField(),
      defineField({ name: 'tag', type: 'string' }),
      portableText,
    ],
  }),
  defineType({
    name: 'package', title: 'Holiday package', type: 'document',
    fields: [
      defineField({ name: 'title', type: 'string' }),
      defineField({ name: 'slug', type: 'slug', options: { source: 'title' } }),
      imageField(),
      defineField({ name: 'priceSummary', type: 'string' }),
      portableText,
    ],
  }),
  defineType({
    name: 'post', title: 'Blog post', type: 'document',
    fields: [
      defineField({ name: 'title', type: 'string' }),
      defineField({ name: 'slug', type: 'slug', options: { source: 'title' } }),
      imageField('coverImage', 'Cover image'),
      defineField({ name: 'author', type: 'string' }),
      defineField({ name: 'publishedAt', type: 'datetime' }),
      defineField({ name: 'excerpt', type: 'text' }),
      portableText,
    ],
  }),
  defineType({
    name: 'testimonial', title: 'Testimonial', type: 'document',
    fields: [
      defineField({ name: 'name', type: 'string' }),
      defineField({ name: 'photo', title: 'Photo (optional)', type: 'image', options: { hotspot: true }, fields: [defineField({ name: 'alt', title: 'Accessible alt text', type: 'string' })] }),
      defineField({ name: 'quote', type: 'text', validation: (rule) => rule.required() }),
      defineField({ name: 'role', type: 'string' }),
    ],
  }),
];
