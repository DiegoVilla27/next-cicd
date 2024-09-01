# NextCICD 📁

How to use NextJS with Jenkins, Sonar and Vercel

- This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) version 14.2.7
```bash
npx create-next-app@latest
```
- React - Version 18
- Node - Version 20.12.2
- Npm - Version 10.5.0

## Development server 🚀

```bash
npm run dev
```
for a dev server and navigate to `http://localhost:3000/`. The application will automatically reload if you change any of the source files.

## Commits 📝

Commit Structure Guidelines:

- `feat: Subject` (Introduces a new feature)
- `fix: Subject` (Resolves a bug or issue)
- `styles: Subject` (Updates styles such as SCSS, CSS, Stylus, Less, etc.)
- `docs: Subject` (Modifies documentation, including README and environment configurations)
- `test: Subject` (Adds or updates unit tests or end-to-end tests)
- `refactor: Subject` (Improves existing code without changing functionality)

> IMPORTANT❗️ _`Subject is sentence-case`_

## Config project 🟨

Folders and files:

- Add the following folder to your root project: _`.github`_
- Inside _`.github`_ create a new folder _`workflows`_
- Create the following files inside _`workflows`_:
- _`merge.yml`_
```yml
name: Deployment

on:
  pull_request:
    types: [closed]
    branches: 
      - main
      - development

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Install Vercel CLI
        run: npm i --global vercel

      - name: Pull
        run: |
          if [ "${{ github.head_ref }}" == "development" ]; then
            vercel pull --environment=production --token=${{ secrets.VERCEL_TOKEN }} --yes
          else
            vercel pull --environment=preview --token=${{ secrets.VERCEL_TOKEN }} --yes
          fi

      - name: Build
        run: |
          if [ "${{ github.head_ref }}" == "development" ]; then
            vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}
          else
            vercel build --token=${{ secrets.VERCEL_TOKEN }}
          fi

      - name: Deploy
        run: |
          if [ "${{ github.head_ref }}" == "development" ]; then
            vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }}
          else
            vercel deploy --prebuilt --token=${{ secrets.VERCEL_TOKEN }}
          fi
```

- _`pr.yml`_
```yml
name: Building

on:
  pull_request:
    types: [opened, synchronize, reopened]
    branches: 
      - main
      - development

jobs:
  build-and-test: 
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20.12.2'
          cache: 'npm'

      - name: Install dependencies
        run: npm install

      - name: Run Linter
        run: npm run eslint

      - name: Run tests
        run: npm run test

      - name: Build project
        run: npm run build
 
      # - name: vercel-preview-url
      #   uses: zentered/vercel-preview-url@v1.1.9
      #   id: vercel_preview_url
      #   env:
      #     VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
      #   with:
      #     vercel_project_id: ${{ secrets.VERCEL_PROJECT_ID }}
      # - name: Get URL
      #   run: echo "https://${{ steps.vercel_preview_url.outputs.preview_url }}"
```

## Config Vercel ⬛

Create Token and ignore builds:

- Go to vercel dashboard [https://vercel.com/](https://vercel.com)
- Account settings -> Settings -> Tokens and create TOKEN NAME = VERCEL_TOKEN, SCOPE = YOUR_USER or TEAM, EXPIRATION = anything
- Go to project settings -> Domains and create `main` and `development` domain
- Go to project settings -> Git -> Ignore Build Step check Behavior `Don't build anything`

## Config Github 🟪

Create secrets:

- Go to github [https://github.com/](https://github.com)
- Go to project settings -> Secrets and variables -> Actions
- Click on `New repository secret`
- Add `VERCEL_TOKEN`, `VERCEL_PROJECT_ID` and `VERCEL_ORG_ID`
- `VERCEL_TOKEN` is located in the tokens of your vercel configurations
- `VERCEL_PROJECT_ID` is located in project configuration
- `VERCEL_ORG_ID` is located in the teams section of your settings

## Errors or Tips ❗️

> Disable eslint line `// eslint-disable-next-line here-rule`

> To disable `@apply error scss` for _Tailwind CSS_ in VSCode, add the following script to your _.vscode > settings.json_: _`"scss.lint.unknownAtRules": "ignore"`_

> If Husky isn't working on MacOS, execute the command (within the root project):
```bash
chmod ug+x .husky/*
```

> To view prettified console objects in testing, use the following syntax: `console.log(JSON.stringify(obj, undefined, 2));`

## Developer 👨🏻‍💻

> Developed By: **`Diego Villa`**. - Website: [https://www.cabuweb.com](https://www.cabuweb.com)
