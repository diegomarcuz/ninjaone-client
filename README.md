# NinjaOne Client - Device Manager

This project is a React client developed with TypeScript and Vite. It uses various modern technologies to provide an efficient and responsive user interface.

## Technologies Used

- [**React**](https://react.dev/): JavaScript library for building user interfaces.
- [**TypeScript**](https://www.typescriptlang.org/): Superset of JavaScript that adds static typing.
- [**Vite**](https://vite.dev/): Fast and modern build tool for web projects.
- [**React Query**](https://tanstack.com/query/latest/docs/framework/react/overview): TanStack Library for managing asynchronous state.
- [**React Table**](https://tanstack.com/table/latest): Headless UI library of TanStack to manage table utilities like sorting, filtering and son without the need to UI.
- [**Material UI**](https://mui.com/material-ui): UI component library.
- [**React Router**](https://reactrouter.com/): Library for routing in React applications.
- [**ESLint**](https://eslint.org/): Linting tool to identify and fix problems in the code.
- [**Prettier**](https://prettier.io/): Code formatting tool.

## Project Structure
```
ninjaone-client/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── formComponents/
│   ├── constants/
│   ├── hooks/
│   ├── providers/
│   ├── schemas/
│   ├── utils/
│   ├── App.css
│   ├── App.tsx
│   ├── main.tsx
│   ├── setupTests.ts
│   ├── vite-env.d.ts
│   └── vite-env-override.d.ts
├── .eslintignore
├── .eslintrc
├── .gitignore
├── .prettierignore
├── .prettierrc
├── index.html
├── package.json
├── README.md
├── tsconfig.json
└── vite.config.ts
```

## How to Run the Project

1. **Clone the repository:**

```sh
git clone https://github.com/diegomarcuz/ninjaone-client.git
cd ninjaone-client
```

2. **Install dependencies:**

```sh
npm install
```

3. **Run the project:**

```sh
npm run dev
```

4. **Open your browser and access:**

```
http://localhost:5173
```

## Available Scripts

- `npm run dev`:  Starts the development server.
- `npm run build`: Creates a production build.
- `npm run lint`: Runs ESLint to check for code issues.

## ESLint Configuration

The project uses ESLint to ensure code quality. The configuration can be found in the `.eslintrc` file.

## Prettier Configuration

Prettier is used for code formatting. The configuration can be found in the `.prettierrc` file.