# Instagram Threads like platform on a mono-repo


<p align="center">
  <img src="https://github.com/aneeshseth/threads/assets/122401851/a301b43f-b5e6-4141-ac7b-0c3e32f907a9" alt="Image 2" width="600" height="300"/>
  <img src="https://github.com/aneeshseth/threads/assets/122401851/ff8e637d-9339-41a9-a05c-01a1ce89f426" alt="Image 3" width="600" height="200"/>
  <img src="https://github.com/aneeshseth/threads/assets/122401851/e672566e-54d8-4bb6-a261-194174ee6886" alt="Image 4" width="200"/>
  <img src="https://github.com/aneeshseth/threads/assets/122401851/dfa89a63-e2bc-4120-8a4f-e351f69e4f35" alt="Image 5" width="200"/>
</p>



- This is an Instagram Threads like application project created to understanding working with an end to end mono-repo, using ShadCN/ui for components, all of them imported from within the shared packages. 
- Used Recoil for State Management across the application which was imported from the packages folder. 
- Used S3 as an Object Storage Platform to store User Profile Pictures
- JWT for authentication
- ExpressJS for the server
- NextJS 13 for the frontend
- Learnt to use Native Websockets on the frontend to interact with the backend for real-time messaging between any 2 users
- Used the 'ws' library to handle socket connections on the backend coming from the frontend
- In pursuit of understanding the working of performing operations on data in a monorepo, users can like, comment, and create threads.

This project is written all in Typescript.


![Static Badge](https://img.shields.io/badge/shadcn%2Fui-latest-blue?link=https%3A%2F%2Fgithub.com%2Fshadcn%2Fui)

This is Turborepo starter with shadcn/ui pre-configured.

> **Note**
> This example uses `pnpm` as package manager.

[npm version](https://github.com/dan5py/turborepo-shadcn-ui/tree/npm)

## Using this example

Clone the repository:

```sh
git clone https://github.com/dan5py/turborepo-shadcn-ui.git
```

Install dependencies:

```sh
cd turborepo-shadcn-ui
pnpm install
```

### Add ui components

Use the pre-made script:

```sh
pnpm ui:add <component-name>
```

> This works just like the add command in the `shadcn/ui` CLI.

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `ui`: a stub React component library shared by both `web` and `docs` applications (🚀 powered by **shadcn/ui**)
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```sh
cd turborepo-shadcn-ui
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```sh
cd turborepo-shadcn-ui
pnpm dev
```

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
cd turborepo-shadcn-ui
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```sh
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)

Learn more about shadcn/ui:

- [Documentation](https://ui.shadcn.com/docs)
