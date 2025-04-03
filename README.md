## Local development

0. Make sure you have NodeJS and Docker installed
1. Start the database (instructions below)
2. Rename .env.example to .env and set all the environment variables (instructions below)
3. Run the development server using `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
5. To view the database, you can also start Drizzle Studio using `npx drizzle-kit studio` and then visit [https://local.drizzle.studio](https://local.drizzle.studio)

## Setup

Install dependencies:

```bash
npm i
```

Create the database using Docker and PostgreSQL (edit as needed):

```bash
docker run --name cs701 -e POSTGRES_PASSWORD=postgres -d -p 5432:5432 postgres
```

Add your database URL in .env as `DATABASE_URL` and `AUTH_DRIZZLE_URL`. If you ran the line above exactly as written, it would be `postgres://postgres:postgres@127.0.0.1:5432/postgres`

Generate Drizzle migrations for the database and then run them:

```bash
npx drizzle-kit generate
```

```bash
npx drizzle-kit migrate
```

Generate `AUTH_SECRET` env by running:

```bash
npx auth secret
```

Put this inside .env (if it doesn't automatically)

Generate OAuth client ID and client secret for GitHub. [Instructions can be found here](https://authjs.dev/guides/configuring-github#creating-an-oauth-app-in-github). Add the environment variables to .env under the following:

```bash
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=
```

(Optional if you already have at least GitHub added) Generate OAuth client ID and client secret for Google through the [Google API Console](https://console.cloud.google.com/apis/dashboard). For further clarification, refer to the [NextJS docs](https://authjs.dev/getting-started/authentication/oauth). Add the environment variables to .env under the following:

```bash
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
```

## Docs

- [AuthJS](https://authjs.dev/getting-started)
- [Drizzle](https://orm.drizzle.team/docs/overview)
