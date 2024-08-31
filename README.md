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

## Configuration ⚙️
Please follow these steps:

### Husky

Install and Configure Husky (Git Hooks)
[Go to ↪](https://typicode.github.io/husky/get-started.html)

```bash
npm i -D husky
```
- Script and Execute (This command will create the _`.husky`_ folder in the root directory):
```bash
"prepare": "npx husky init"
```
- Create a Git Hook for `commit-msg` to run a regular expression validator (CommitLint) before each commit:
  - Execute command (Old version):
    ```bash
    npx husky add .husky/commit-msg 'npx --no -- commitlint --edit ${1}'
    ```
  - Execute command (New version):
    ```bash
    echo "npx --no -- commitlint --edit \${1}" > .husky/commit-msg
    ```
- Create a Git Hook for `pre-commit` to run lint-staged (Prettier and ESLint) and tests before each commit:
  - Script:
    ```bash
    "test:staged": "git diff --cached --diff-filter=d --name-only -- '*.test.tsx' | xargs -I {} npm run test --include={} --browsers=ChromeHeadless --watch=false"
    ```
    Explanation:
    - `git diff` Displays changes in files
    - `--cached` Shows only staged files
    - `--diff-filter=d` Ignores deleted files
    - `--name-only` Displays only file names
    - `'*.test.tsx'` Filters only files with .test.tsx extension
    - `|` Redirects output from the previous command to the next
    - `xargs` Takes a list of elements and passes them as arguments to another command
    - `-I {}` Saves the list of elements in {}
    - `npm run test` Executes tests
    - `--include={}` Includes the saved list of elements for individual testing
    - `--browsers=ChromeHeadless` Runs tests in Chrome without the graphical interface
    - `--watch=false` Does not open the browser window
  - Execute command (Old version):
    ```bash
    npx husky add .husky/pre-commit "npx lint-staged && git diff --cached --diff-filter=d --name-only -- '*.test.tsx' | xargs -I {} npm run test --include={} --browsers=ChromeHeadless --watch=false"
    ```
  - Execute command (New version):
    ```bash
    echo "npx lint-staged && git diff --cached --diff-filter=d --name-only -- '*.test.tsx' | xargs -I {} npm run test --include={} --browsers=ChromeHeadless --watch=false" > .husky/pre-commit
    ```
- Create a Git Hook for `pre-push` to execute a specified command before each push:
  - Execute command (Old version):
    ```bash
    npx husky add .husky/pre-push "#HERE ANYTHING COMMAND"
    ```
  - Execute command (New version):
    ```bash
    echo "#HERE ANYTHING COMMAND" > .husky/pre-push
    ```

### Prettier 🎨

Install and Configure Prettier
[Go to ↪](https://prettier.io/docs/en/install.html)

```bash
npm i -D prettier
```
- Script (Exec prettier for all files):
  ```bash
  "prettier": "prettier . --write"
  ```
- Create file _`.prettierrc.json`_

```json
{
  "tabWidth": 2,
  "useTabs": false,
  "semi": false,
  "singleQuote": false,
  "quoteProps": "preserve",
  "jsxSingleQuote": false,
  "trailingComma": "none",
  "bracketSpacing": true,
  "bracketSameLine": false,
  "jsxBracketSameLine": false,
  "arrowParens": "always",
  "embeddedLanguageFormatting": "auto",
  "singleAttributePerLine": true,
  "overrides": [
    {
      "files": ["*.js", "*.ts", "*.tsx", "*.jsx", "*.css", "*.scss"],
      "options": {
        "semi": true
      }
    }
  ]
}
```

- Create or update file _`.editorconfig`_

```json
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
insert_final_newline = true
trim_trailing_whitespace = true

[*.ts]
quote_type = single

[*.md]
max_line_length = off
trim_trailing_whitespace = false
```

### Lint, Lint-Staged and Commit Lint 🔐

Install and Configure Lint (Linter), Lint-Staged (Staged Commits Linter), and Commit Lint (Conventional Commits)
[Go to ESLint ↪](https://eslint.org/docs/latest/use/getting-started)
[Go to Lint Staged ↪](https://www.npmjs.com/package/lint-staged)
[Go to Commit Lint ↪](https://commitlint.js.org/guides/getting-started.html)

```bash
npm i -D lint-staged @commitlint/types @commitlint/cli @commitlint/config-conventional @typescript-eslint/eslint-plugin@7.2.0 eslint-plugin-html @typescript-eslint/parser@7.2.0 eslint-plugin-react-hooks eslint-plugin-react-refresh eslint-plugin-react
```

- Create file _`.eslintrc.json`_
```json
{
  "root": true,
  "env": {
    "browser": true,
    "es2020": true
  },
  "extends": [
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime" // This line indicates that we are utilizing React 17 or higher and require its new rules
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true, // We enable JSX support
      "tsx": true // We enable TSX support
    }
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  "plugins": [
    "react-refresh",
    "@typescript-eslint",
    "react",
    "html"
  ],
  "rules": {
    "react-hooks/rules-of-hooks": "error", // Rules of hooks
    "react/react-in-jsx-scope": "off", // Rule for allows the use of a TSX or JSX component without the need to import React
    "react/jsx-uses-react": "off",
    "react/jsx-uses-vars": "error", // Rule for disallow use var
    "react/hook-use-state": "error", // Rule to check whether unstructured value and setter variables in a useState() call are named symmetrically
    "react/jsx-key": "error", // Rule for using Keys in Child Elements within Loops
    "quotes": [ // Rule for using double quotes
      "error",
      "double",
      {
        "avoidEscape": true,
        "allowTemplateLiterals": true
      }
    ],
    "@typescript-eslint/quotes": [
      "error",
      "double",
      {
        "avoidEscape": true,
        "allowTemplateLiterals": true
      }
    ],
    "eqeqeq": [ // Rule for strict equality (=== or !==)
      "error",
      "smart"
    ],
    "no-console": [ // Rule to avoid using console statements
      "error"
    ],
    "no-else-return": [ // Rule to disallow else as a return
      "error",
      {
        "allowElseIf": true
      }
    ],
    "no-empty": [ // Rule to disallow empty blocks
      "error",
      {
        "allowEmptyCatch": false
      }
    ],
    "no-extra-semi": [ // Rule to disallow extra semicolons
      "error"
    ],
    "@typescript-eslint/no-extra-semi": [
      "error"
    ],
    "semi": [ // Rule to ensure there is a semicolon at the end
      "error",
      "always",
      {
        "omitLastInOneLineBlock": true,
        "omitLastInOneLineClassBody": true
      }
    ],
    "@typescript-eslint/semi": [
      "error",
      "always",
      {
        "omitLastInOneLineBlock": true,
        "omitLastInOneLineClassBody": true
      }
    ]
  }
}
```

- Create file _`.lintstagedrc`_
```json
{
  "**/*.{js,jsx,ts,tsx}": ["prettier --write", "eslint"]
}
```

- Script (Executes the linter):
  ```bash
  "lint": "eslint ."
  ```
- Script (Fixes errors reported by the linter):
  ```bash
  "lint:fix": "eslint --fix ."
  ``` 
- Script (Executes the linter for files staged for commit):
  ```bash
  "lint:staged": "npx lint-staged"
  ```
  
- Create file _`commitlint.config.ts`_
```typescript
import type { UserConfig } from "@commitlint/types"
import { RuleConfigSeverity } from "@commitlint/types"

/** 
 * Docs https://commitlint.js.org/#/reference-rules
  Each rule has 3 properties:
  -> Level
  0: Disables the rule
  1: Enables the rule like a warning
  2: Enables the rule like a error
  -> Applicable
  "always": Enables the rule always
  "never": Disable the rule always
  -> Value
  string|boolean|number|array

  "name-rule": [Level, Applicable, Value]
*/

const Configuration: UserConfig = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-empty": [
      // It is responsible for validating the type
      RuleConfigSeverity.Error,
      "never"
    ],
    "type-enum": [
      // It is responsible for managing types (e.g., feat, fix, bug, and others)
      RuleConfigSeverity.Error,
      "always",
      ["feat", "fix", "styles", "docs", "test", "refactor"]
    ],
    "type-case": [
      // It is responsible for enforcing case conventions in the type
      RuleConfigSeverity.Error,
      "always",
      "lower-case"
    ],
    "scope-empty": [
      // It is responsible for managing the scope (e.g., feat(frontend), fix(web), and others)
      RuleConfigSeverity.Error,
      "always"
    ],
    "subject-empty": [
      // It is responsible for validating the subject
      RuleConfigSeverity.Error,
      "never"
    ],
    "subject-case": [
      // It is responsible for enforcing case conventions in the subject
      RuleConfigSeverity.Error,
      "always",
      "sentence-case"
    ],
    "subject-min-length": [
      // It is responsible for ensuring the subject meets the minimum length requirement
      RuleConfigSeverity.Error,
      "always",
      10
    ],
    "subject-max-length": [
      // It is responsible for enforcing the maximum length limit of the subject
      RuleConfigSeverity.Error,
      "always",
      50
    ],
    "body-empty": [
      // It is responsible for validating the body
      RuleConfigSeverity.Error,
      "always"
    ],
    "footer-empty": [
      // It is responsible for validating the footer
      RuleConfigSeverity.Error,
      "always"
    ]
  }
}
module.exports = Configuration
```

### Testing 🧪

Jest to testing application
[Go to ↪](https://jestjs.io/docs/getting-started)

```bash
npm i -D jest jest-environment-jsdom @types/jest @testing-library/react @testing-library/jest-dom
```

- Script (Executes all unit tests):
  ```bash
  "test": "jest --coverage"
  ```
- Script (Executes a single unit test):
  ```bash
  "test:one": "jest --coverage --collectCoverageFrom='your-url-relative-component-here' --watch your-url-relative-component-here"
  ```
  
- Create file _`jest.config.js`_ and paste this:
```js
// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jsdom",
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};

module.exports = createJestConfig(customJestConfig);
```

- Create file _`jest.setup.js`_ and paste this:
```js
// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
```

- Add the following to your `tsconfig.json` file (in 'compilerOptions'):
```json
"types": ["@testing-library/jest-dom"],
```

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
