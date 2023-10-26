# The Romanian Diaspora Map Kit UI

This project is created by [DCB](https://diasporacivica.berlin/) and aims to
facilitate the creation of community maps by and for Romanian diaspora
communities across the globe. The Map Kit allows members of these communities
to create their own map based application to manage and share POIs around a
certain region. Its goal is to provide clear information on places of interest
and services in demand among the Romanian diaspora in the city and its
surroundings.

The basic principle is: Any person can authenticate via social auth, propose a
new community and then publish and manage it once it's approved by DCB
moderators.

## Technical design

The app is built with Next.js and Tailwind, forms are built using Formik and
authentication is done with OIDC (social auth) via Auth0. The project is
written in JS, but it's Typescript ready, in case an incremental transition is
desired at any point.

## Set up for development

-   You'll need to have a backend running for the app to work properly; you can
    either spin up a local copy from the `map-kit-backend` repo, or you can try
    hooking into the live server (the latter has limitations and is potentially
    risky).
-   Make sure you have all the following variables set up in `.env.local`
    -   `NEXT_PUBLIC_AUTH_DOMAIN` (All the auth variables need to be provided in
        order for auth to work. We use Auth0 for this project, so you can either
        create a new account and generate test credentials for yourself, or ask
        your DCB colleagues for a set)
    -   `NEXT_PUBLIC_AUTH_CLIENT_ID`
    -   `NEXT_PUBLIC_AUTH_AUDIENCE`
    -   `NEXT_PUBLIC_MAPBOX_TOKEN` (You need create a free Mapbox account and get a
        token, or ask other project contributors if they can lend you theirs)
    -   `NEXT_PUBLIC_API_BASE_URL` (URL of the backend server,
        `http://localhost:8000` by default if you spin it up locally by using the
        backend repo of this project)
    -   `NEXT_PUBLIC_WEB_APP_BASE_URL` (URL of this app, by default
        `http://localhost:3000`)
    -   `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` (Google Places API Key - for Autocomplete features)
-   The vars will get picked up automatically from the `.env.local` file.
-   Now you just need to install you dependencies with `yarn install` and then
    run `yarn dev` and you're good to go.
