# Chatbot App

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`

Builds the app for production to the `.next` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run start`

Starts the application in production mode.\
Make sure to run `npm run build` before starting the application.

### `npm run lint`

Runs the linter to check for code quality issues.

### `npm run test`

Runs the unit tests using Jest.

### `npm run cypress:open`

Opens the Cypress Test Runner for end-to-end testing.

### `npm run cypress:run`

Runs the Cypress tests in headless mode.

### `npm run tsc-check`

Runs TypeScript type checking.

## Database Information

This project uses [Prisma](https://www.prisma.io/) as the ORM for database management. Ensure you have the database running and configured correctly.

### Prisma Commands

- `npx prisma migrate dev` - Run migrations in development.
- `npx prisma migrate deploy` - Run migrations in production.
- `npx prisma studio` - Open Prisma Studio to view and edit data.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
