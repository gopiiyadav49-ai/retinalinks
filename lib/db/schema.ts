import { pgTable, serial, text, integer, jsonb, boolean, timestamp } from 'drizzle-orm/pg-core'

export const services = pgTable('services', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  icon: text('icon').notNull(),
  features: jsonb('features').$type<string[]>().default([]).notNull(),
  order: integer('order').default(0).notNull(),
})

export const portfolio = pgTable('portfolio', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  imageUrl: text('image_url').notNull(),
  tags: jsonb('tags').$type<string[]>().default([]).notNull(),
  order: integer('order').default(0).notNull(),
})

export const leads = pgTable('leads', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  country: text('country'),
  message: text('message').notNull(),
  whatsappOptIn: boolean('whatsapp_opt_in').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const faqs = pgTable('faqs', {
  id: serial('id').primaryKey(),
  question: text('question').notNull(),
  answer: text('answer').notNull(),
  order: integer('order').default(0).notNull(),
})

export const testimonials = pgTable('testimonials', {
  id: serial('id').primaryKey(),
  quote: text('quote').notNull(),
  name: text('name').notNull(),
  role: text('role').notNull(),
  company: text('company').notNull(),
  photoUrl: text('photo_url'),
  order: integer('order').default(0).notNull(),
})

export type Service = typeof services.$inferSelect
export type NewService = typeof services.$inferInsert

export type PortfolioItem = typeof portfolio.$inferSelect
export type NewPortfolioItem = typeof portfolio.$inferInsert

export type Lead = typeof leads.$inferSelect
export type NewLead = typeof leads.$inferInsert

export type Faq = typeof faqs.$inferSelect
export type NewFaq = typeof faqs.$inferInsert

export type Testimonial = typeof testimonials.$inferSelect
export type NewTestimonial = typeof testimonials.$inferInsert
