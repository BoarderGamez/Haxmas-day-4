import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core"

export const people = sqliteTable("people", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  remarks: text("remarks"),
  worth: integer("worth").notNull().default(0),
  added: integer("added_at").notNull(),
})
