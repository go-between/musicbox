# Musicbox

## Things You Need First

- [nvm](https://github.com/nvm-sh/nvm)
  - `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash
`
- [node](https://nodejs.org/en/)
  - `nvm install`

## Setup

We are not currently using Docker for this project, so you'll have to install some things yourself.  Do like:

1. Ensure you're using the correct node version
    > nvm use
2. Install packages
    > npm install
3. Copy the env template (replace any ENV variables that need replacing)
    > cp .env.template .env
4. Start the dev server
    > npm start

Now your dev server should be up and running.  It opens a tab for you automatically!  It hot-reloads!

## Commands

- `npm start`
  - Runs the hot-reload development server
- `npm tsc` (or just `tsc` for newer versions)
  - Runs the typescript compiler.  Note that we're using [Babel](https://babeljs.io/) to transpile typescript to javascript, so there's **no type checking at runtime**.  This is both good and bad because your dev server will not explode if you make a type error while developing -- but you'll want to run this occassionally to make sure everything is hunky-dory!
- `npm run lint:fix`
  - Runs [ESLint](https://eslint.org/), including [Prettier](https://prettier.io/). Attempts to correct any errors you make.

## Contributing

Thank you for considering to spend some of your life energy in order to make the Musicbox a better thing.  Please see [CONTRIBUTING.md](CONTRIBUTING.MD) for details and guidelines.

## License

Can you run your own copy of Musicbox on your own servers for your friends?  Yes!

Can you sell your rebranded Musicbox to other folks?  Please do not!

See [LICENSE.txt](LICENSE.txt) for details.

## Operational Costs

How much money does it cost to make a thing exist on the internet?

See [COSTS.md](http://github.com/go-between/musicbox-api/COSTS.md) in the musicbox-api repository for details.
