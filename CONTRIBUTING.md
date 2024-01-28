# Contribution Guide

### Getting Started

To setup the development server, run the following commands.

```
pnpm install
pnpm build
pnpm dev
```

## Using CLI

### Install dependencies of all packages

```sh
pnpm install
```

### Develop

To run all dev servers of apps and packages, run the following command:

```
pnpm dev
```

You would typically run the SSR example app and the debugger to build the debugger.

```
pnpm dev --filter test-app-ssr --filter recoil-inspector
```

### Build

To build all apps and packages, run the following command:

```
pnpm build
```

If you want to ignore cached build result, use the --force flag.
The --no-cache only prevent Turborepo from writing to cache, not reading from cache.

```
pnpm build --force
```

### Run an NPM script

Ro run the dev server, run `pnpm dev --filter recoil-inspector`

```
turbo run <NPM script> --filter=<sub-package name>
```

## Package Management

### Add a package to a workspace

```sh
pnpm add <package> --filter <workspace>
```

### Remove a package from a workspace

```sh
pnpm remove <package> --filter <workspace>
```

### Publish a new NPM package version

At the project root directory, run the below command.

```bash
sh publish-npm-package.sh
```
