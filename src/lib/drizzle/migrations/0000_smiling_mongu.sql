CREATE TYPE "public"."voice_categories" AS ENUM('Audiobook', 'Conversational', 'Customer Service', 'General', 'Narrative', 'Characters', 'Meditation', 'Motivational', 'Podcast', 'Advertising', 'Voiceover', 'Corporate');--> statement-breakpoint
CREATE TYPE "public"."voice_variant" AS ENUM('Custom', 'System');--> statement-breakpoint
CREATE TABLE "generations" (
	"id" text PRIMARY KEY NOT NULL,
	"organization_id" text NOT NULL,
	"voice_id" text,
	"prompt" text NOT NULL,
	"voice_name" text NOT NULL,
	"r2_object_key" text,
	"temperature" real NOT NULL,
	"top_p" real NOT NULL,
	"top_k" integer NOT NULL,
	"repetition_penalty" real NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "generations" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "voices" (
	"id" text PRIMARY KEY NOT NULL,
	"organization_id" text,
	"description" text,
	"category" "voice_categories" DEFAULT 'General' NOT NULL,
	"language" text DEFAULT 'en-US' NOT NULL,
	"variant" "voice_variant" NOT NULL,
	"r2_object_key" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "voices" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "generations" ADD CONSTRAINT "generations_voice_id_voices_id_fk" FOREIGN KEY ("voice_id") REFERENCES "public"."voices"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "generations_organization_id_idx" ON "generations" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "generations_voice_id_idx" ON "generations" USING btree ("voice_id");--> statement-breakpoint
CREATE INDEX "voices_organization_id_idx" ON "voices" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "voices_variant_idx" ON "voices" USING btree ("variant");