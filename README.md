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

## Config project ⬜

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

      - name: Sonar Scan
        uses: SonarSource/sonarcloud-github-action@master
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}

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

- Create the following in root project _`sonar-project.properties`_:
```properties
sonar.projectKey={{projectKey}}
sonar.organization={{organizationKey}}

# This is the name and version displayed in the SonarCloud UI.
#sonar.projectName=next-cicd
#sonar.projectVersion=1.0

# Path is relative to the sonar-project.properties file. Replace "\" by "/" on Windows.
#sonar.sources=.

# Encoding of the source code. Default is default system encoding
#sonar.sourceEncoding=UTF-8
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
- Add `VERCEL_TOKEN`, `VERCEL_PROJECT_ID`, `VERCEL_ORG_ID` and `SONAR_TOKEN`
- `VERCEL_TOKEN` is located in the tokens of your vercel configurations (Vercel)
- `VERCEL_PROJECT_ID` is located in project configuration (Vercel)
- `VERCEL_ORG_ID` is located in the teams section of your settings (Vercel)
- `SONAR_TOKEN` is located in the teams section of your settings (SonarCloud)

## Config Sonar 🟧

Create Token and disabled Automatic Analysis:

- Go to SonarCloud [https://sonarcloud.io](https://sonarcloud.io)
- Go to My account -> Security -> Generate token `SONAR_TOKEN`
- Go to My account -> Organizations -> _OrganizationKey_ is here
- Go to My Projects -> Select project current -> Administration -> Analysis Method -> Disable _Automatic Analysis_


## Developer 👨🏻‍💻

> Developed By: **`Diego Villa`**. - Website: [https://www.cabuweb.com](https://www.cabuweb.com)
