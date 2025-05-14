## Features

- [Next.js + App Router](https://nextjs.org/)
- [Supabase + Supabase Auth](https://supabase.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)

## Run

1.  Install the dependancies

    ```bash
    npm install
    ```

2.  [Create a Supabase project](https://database.new)

3.  Rename `.env.example` to `.env.local` and update the following:

    ```
    NEXT_PUBLIC_SUPABASE_URL=[INSERT SUPABASE PROJECT URL]
    NEXT_PUBLIC_SUPABASE_ANON_KEY=[INSERT SUPABASE PROJECT API ANON KEY]
    ```

    Both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` can be found in [your Supabase project's API settings](https://app.supabase.com/project/_/settings/api)

4.  Run the Next.js local development server:

    ```bash
    npm run dev
    ```

    The starter kit should now be running on [localhost:3000](http://localhost:3000/).

5.  Setup OAuth _(optional)_

    By default **"Sign in with Google"** is listed as an option on auth pages. This feature can rither be removed or implemented using [this guide](https://supabase.com/docs/guides/auth/social-login/auth-google?queryGroups=environment&environment=server)

    [OAuth setup guides for other providers](https://supabase.com/docs/guides/auth/social-login#set-up-a-social-provider-with-supabase-auth)

## Deploy

[Deploy with Vercel](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmushka-n%2Fnext-supabase-template&project-name=next-supabase-template&repository-name=next-supabase-template)

#

> This template comes with the opinionated Prettier setup. It can be changed in the `.prettierrc.js` file

> This template comes with the opinionated ESLint 9 setup. It can be changed in the `eslint.config.mjs` file

> This template comes with the default shadcn/ui style initialized. If you instead want other ui.shadcn styles, delete `components.json` and [re-install shadcn/ui](https://ui.shadcn.com/docs/installation/next)
