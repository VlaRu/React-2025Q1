# React-Pokemon Api

## Stack: 
- React 
- Redux 
- hooks: Context API , useState , useEffect
- RTK query 
- TS 
- Eslint Prettier Husky Stylelint
- Vite 
- Vitest

![image](./pokemon-scr.png)

## Implemented Features

- Fetched data from API using RTK Query
- Fetched Pokémon data by name from the server.
  - Persist search history in Local Storage to restore previous search results on new sessions.
- Implement Pagination by sending a request to the server, current page display in the browser URL
- Display details card on the same page, display id the selected item in the browser URL
- Managed selections with Redux store
- Added CSV download for selected items
- Appearing and hidden Flyout with Unselect/Download buttons
- Implemented Theme switching (Context API)
- UI effects:
  - Added card hover animations
  - Responsible and adaptive for mobile devises

### Config Utils

- Created a template file commitlint.config.cjs for validating commit message naming conventions

## Deploy [link]()

## Install application

1. Clone the project with `git clone`
2. Run `npm i` to install dependencies
3. Run `npm run dev` to start local development server

### Provided scripts

```sh
npm run dev
```

Start local development server

```sh
npm run build
```

Build project in production mode for further deployment

```sh
npm run format:fix
```

`Prettier` command fixes issues

```sh
npm run lint:fix
```
Eslint check for errors and coding style issues.

```sh
npm husky init
```
Setting up husky in a project