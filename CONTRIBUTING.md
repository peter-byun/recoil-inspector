# Contribution Guide

### Getting Started

To setup the development server, run the following commands.

```
yarn install
yarn run build
yarn run dev
```

## Using CLI

Here are some frequently used commands. Visit [the official documentation of yarn](https://yarn.io/yarn-cli#commands) for more information.

### Install dependencies of all packages

```sh
yarn install
```

### Develop

To run all dev servers of apps and packages, run the following command:

```
yarn run dev
```

You would typically run the SSR example app and the debugger to build the debugger.

```
yarn run dev --filter test-app-ssr --filter recoil-inspector
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

### Run an NPM script

Ro run the dev server, run `yarn run dev --filter recoil-inspector`

```
turbo run <NPM script> --filter=<sub-package name>
```

## Package Management

### Add a package to a workspace

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

### Publish a new NPM package version

At the project root directory, run the below command.

```bash
sh publish-npm-package.sh
```
