# Musicbox

## Things You Need First

- [nvm](https://github.com/nvm-sh/nvm)
  - `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash
`
- [node](https://nodejs.org/en/)
  - `nvm install`

## Setup

We are not currently using Docker for this project, so you'll have to install some things yourself.  Do like:

1. `nvm use`
2. `npm install`
3. `npm start`

Now your dev server should be up and running.  It opens a tab for you automatically!  It hot-reloads!

## Commands

- `npm start`
  - Runs the hot-reload development server
- `npm tsc`
  - Runs the typescript compiler.  Note that we're using [Babel](https://babeljs.io/) to transpile typescript to javascript, so there's **no type checking at runtime**.  This is both good and bad because your dev server will not explode if you make a type error while developing -- but you'll want to run this occassionally to make sure everything is hunky-dory!
- `npm run lint:fix`
  - Runs [ESLint](https://eslint.org/), including [Prettier](https://prettier.io/). Attempts to correct any errors you make.

## Contributing

1.  We do not currently have a build server setup, so please run the typescript compiler and linter to make sure everything is a-okay.
2.  We haven't started writing tests yet, so I guess don't worry too much about that.
