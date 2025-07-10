# 👋 Welcome to your Threads Clone

## Getting Started

## Create a new React Native Expo project

```bash
npx create-expo-app@latest
npx expo start -c
```

EXPO Docs: https://docs.expo.dev/router/installation/

## Add Gluestack UI

```bash
npx gluestack-ui init
npx gluestack-ui add
```

Gluestack UI Docs: https://ui.gluestack.com/docs/getting-started/installation

### Create .env file

```bash
EXPO_PUBLIC_SUPABASE_URL=https://SUPABASE_USERNAME.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=SUPABASE_KEY
DATABASE_URL=postgresql://SUPABASE_USERNAME:SUPABASE_PASSWORD@aws-0-us-west-1.pooler.supabase.com:5432/postgres
EXPO_PUBLIC_GIPHY_API_KEY=GIPHY_KEY
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=GOOGLE_MAPS_KEY
EXPO_PUBLIC_BUCKET_URL=https://SUPABASE_USERNAME.supabase.co/storage/v1/object/public/files
```

### Supabase

Grant permissions to authenticated users

```bash
grant usage on schema "public" to anon;
grant usage on schema "public" to authenticated;

GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA "public" TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA "public" TO anon;

```

## Prisma & DB Structure

Add Prisma locally to manage schema

```bash
npm install prisma --save-dev
npx prisma init --datasource-provider postgresql
npx prisma db pull
npx prisma generate
npx prisma migrate dev --name dev OR npx prisma db push
npx prisma format
```

### Add Prisma schema to prisma/shema.prisma

```prisma
generator client {
    provider        = "prisma-client-js"
    previewFeatures = ["postgresqlExtensions"]
}

datasource db {
    provider   = "postgresql"
    url        = env("DATABASE_URL")
    extensions = [uuidOssp(map: "uuid-ossp")]
}

model User {
    id String  @id      @default(dbgenerated("uuid_generate_v4()"))
    username   String?  @unique
    avatar     String?
    created_at Datetime @default(now())
}
```
