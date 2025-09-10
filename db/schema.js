// Example Drizzle schema for your portfolio
// This file will be generated/configured by `npx netlify db init`

import { pgTable, serial, text, timestamp, varchar, integer } from 'drizzle-orm/pg-core';

// Blog posts table
export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content'),
  excerpt: text('excerpt'),
  slug: varchar('slug', { length: 255 }).unique(),
  published: timestamp('published').defaultNow(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Contact messages table
export const contacts = pgTable('contacts', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  message: text('message').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Portfolio projects table
export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  imageUrl: varchar('image_url', { length: 500 }),
  demoUrl: varchar('demo_url', { length: 500 }),
  githubUrl: varchar('github_url', { length: 500 }),
  technologies: text('technologies'), // JSON string of tech stack
  featured: integer('featured').default(0), // 0 or 1 for boolean
  createdAt: timestamp('created_at').defaultNow(),
});

// Skills/testimonials tracking
export const testimonials = pgTable('testimonials', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  role: varchar('role', { length: 255 }),
  company: varchar('company', { length: 255 }),
  message: text('message').notNull(),
  rating: integer('rating').default(5),
  approved: integer('approved').default(0),
  createdAt: timestamp('created_at').defaultNow(),
});
