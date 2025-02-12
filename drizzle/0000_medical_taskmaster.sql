CREATE TABLE "TaskSync_Users" (
	"id" serial PRIMARY KEY NOT NULL,
	"authid" uuid NOT NULL,
	"username" varchar NOT NULL,
	"email" varchar NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "TaskSync_Users_email_unique" UNIQUE("email")
);
