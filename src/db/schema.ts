import { serial, uuid, pgTable, varchar, timestamp } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const TaskSync_Users = pgTable("TaskSync_Users", {
    id: serial("id").primaryKey(),  
    authid: uuid("authid").notNull(),
    username: varchar("username").notNull(),
    email: varchar("email").unique().notNull(),
    created_at: timestamp("created_at").default(sql`now()`),
    updated_at: timestamp("updated_at").default(sql`now()`),
});

export const TaskSync_Tasks = pgTable("TaskSync_Tasks", 
    {
        tid: serial("tid").primaryKey(),
        task_title:varchar("task_title").notNull(),
        task_description:varchar("task_description").notNull(),
        start_date:varchar("start_date").notNull(),
        end_date:varchar("end_date").notNull(),
        start_time:timestamp("start_time").notNull(),
        end_time:timestamp("end_time").notNull(),
        category:varchar("category").notNull(),
        priority:varchar("priority").notNull(),
        status:varchar("status").notNull(),
        created_at: timestamp("created_at").default(sql`now()`),
        updated_at: timestamp("updated_at").default(sql`now()`),
    }
)