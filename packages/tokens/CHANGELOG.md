## 0.2.2 (2024-12-28)


### 🩹 Fixes

- **components:** unignored JSON token files to the repo to avoid a problem where Storybook doesn't build without them


### 🧹 Chores

- **tokens:** updated tokens from Figma GUP UI library

- **tokens:** pretty-print Figma token JSON files for simpler diffing when updated


### ❤️  Thank You

- Aleksandr Beliaev
- devops
- Ekaterina Loginova

## 0.2.1 (2024-08-10)


### 🩹 Fixes

- **tokens:** fixed colors hover color format in build.js

- **tokens:** resolved nested variable aliases and undefined variables


### 🧹 Chores

- **tokens:** updated color variables

- **tokens:** updated spacing variables

- **tokens:** updated color variables

- **tokens:** updated spacing variables


### ❤️  Thank You

- Aleksandr Beliaev
- devops
- Ekaterina Loginova
- Ekaterina.Loginova
- faisal-haddad

## 0.2.0 (2024-07-09)


### 🚀 Features

- **tokens:** fixed tokens with aliases

- **tokens:** updated tokens

- **tokens:** synced figma color tokens


### 🩹 Fixes

- **tokens:** fix alias resolution logic in transformFigmaVariables script


### ❤️  Thank You

- Aleksandr Beliaev
- devops
- Ekaterina.Loginova
- faisal-haddad

## 0.1.0 (2024-06-20)


### 🚀 Features

- **all:** added a basic package for tokens

- **components:** added monorepo prefix to each nx package

- **tokens:** test change


### 🩹 Fixes

- **tokens:** added missing fs import

- **tokens:** fixed broken CSS variable names for colors produced by Figma sync

- **tokens:** made tokens file actual main entry in the tokens package

- **tokens:** throw a warning when data structure is not correct in figma-variables.json

- **tokens:** removed unnecessary import in the build script

- **tokens:** a test change

- **tokens:** test change

- **tokens:** test change 1


### 🛠️ Refactorings

- **tokens:** rewritten obtaining tokens from axios to native Nodejs API

- **tokens:** moved .env file required for sync-tokens command to the package folder


### 📝 Documentation Changes

- **tokens:** improved documentation for tokens package


### 🧹 Chores

- **tokens:** updated tokens files

- **release:** publish

- **release:** publish

- **release:** publish

- **release:** publish

- **release:** publish

- **release:** publish

- **release:** publish

- **tokens:** moved local transform and build script to be a separate npm command

- **release:** publish


### 📦 CI/CD Changes

- **components:** fixed missing workspace prefix in components package name


### 🚚 Dependency Updates

- **all:** resetting the package versions


### ✏️ Formatting and Automatically Generated Files

- **tokens:** manual formatting

- **all:** autoformat


### ❤️  Thank You

- Aleksandr Beliaev
- devops