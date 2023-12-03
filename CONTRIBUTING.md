# Contribution Guide

### Getting Started

To setup the development server, run the following commands.

```
yarn install
yarn run build
yarn run dev
```

If you want to run the frontend dev server, run the below command.

```
turbo run dev:standalone --filter=frontend
```

> Note that you need to re-run the dev script after changing the npm-package. It's not optimal, but we will fix it soon.

## Using CLI

Here are some frequently used commands. Visit [the official documentation of yarn](https://yarn.io/yarn-cli#commands) for more information.

### Install dependencies of all packages

```sh
yarn install
```

### Build

To build all apps and packages, run the following command:

```
yarn run build

```

If you want to ignore cached build result, use the --force flag.
The --no-cache only prevent Turborepo from writing to cache, not reading from cache.

```
yarn run build --force
```

### Develop

To run all dev servers of apps and packages, run the following command:

```
yarn run dev
```

### Running an NPM script

Ro run the dev server, run `yarn run dev --filter recoil-inspector`

```
turbo run <NPM script> --filter=<sub-package name>
```

## Package Management

### Install a package in a workspace

```sh
yarn workspace <workspace> add <package>
# An example:
yarn workspace web add react

```

### Remove a package from a workspace

```sh

yarn workspace <workspace> remove <package>
# An example:
yarn workspace web remove react
```

### Upgrade a package in a workspace

```sh
yarn workspace <workspace> upgrade <package>
# An example:
yarn workspace web upgrade react

```

### Publish a new NPM package version

```bash
cd ./packages/recoil-inspector
npm version patch
npm publish
```
