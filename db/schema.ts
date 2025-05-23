// Schema for Drizzle

// FROM HERE is from Drizzle/AuthJS docs

import {
  boolean,
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [
    {
      compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId],
      }),
    },
  ]
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => [
    {
      compositePk: primaryKey({
        columns: [verificationToken.identifier, verificationToken.token],
      }),
    },
  ]
);

export const authenticators = pgTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  (authenticator) => [
    {
      compositePK: primaryKey({
        columns: [authenticator.userId, authenticator.credentialID],
      }),
    },
  ]
);

// UNTIL HERE is from Drizzle/AuthJS docs

// Created by Allen Chen & Berk Tellioglu

export const games = pgTable("games", {
  gameId: integer("gameId").primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull(),
  description: text("description"),
  image: text("image"),
  link: text("link"),
  createdBy: text("createdBy"),
});

export const numdleGames = pgTable("numdleGames", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  gameId: integer()
    .notNull()
    .references(() => games.gameId, { onDelete: "cascade" }),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  answer: text().notNull(),
  attempts: integer().notNull().default(0),
  finished: boolean().notNull().default(false),
  startTime: timestamp().defaultNow().notNull(),
  endTime: timestamp(),
  clearTime: timestamp(),
});

export const numdleLogs = pgTable("numdleLogs", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  guess: text().notNull(),
  perfect: integer().notNull().default(0),
  imperfect: integer().notNull().default(0),
  gameId: integer()
    .notNull()
    .references(() => numdleGames.id, { onDelete: "cascade" }),
});

export const typingSpeed = pgTable("typingSpeed", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  gameId: integer()
    .notNull()
    .references(() => games.gameId, { onDelete: "cascade" }),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  wpm: integer("wpm").notNull(),
  accuracy: integer("accuracy").notNull(),
  mistakes: integer("mistakes").notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }),
});

export const mathQuiz = pgTable("mathQuiz", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  gameId: integer()
    .notNull()
    .references(() => games.gameId, { onDelete: "cascade" }),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  score: integer("score").notNull(),
  questionsAnswered: integer("questionsAnswered").notNull(),
  accuracy: integer("accuracy").notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }),
});
