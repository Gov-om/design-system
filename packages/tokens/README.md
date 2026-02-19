# Tokens

## To sync fresh tokens to the library:

1. Create a personal token by navigating to _Settings_ modal, _Account_ tab, _Personal access tokens_ section on the Figma website or your Figma desktop app;
2. Create an `.env` file in the package folder and add your `FIGMA_API_TOKEN` there (see `.env.example` file);
3. Run `npx nx run @govom/tokens:sync-tokens` in the root folder or `npm run sync-tokens` in the package folder.
