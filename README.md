# BookNook — A Small Online Library

BookNook is an online library where readers can discover books, share their own books, borrow available copies, and return them for the next reader.

## Live Website

ADD_YOUR_LIVE_SITE_URL_HERE

## Repositories

- Client: https://github.com/jstashin/booknook-client
- Server: https://github.com/jstashin/booknook-server

## Features

- Browse all books without logging in.
- Discover the six newest books in the Home page’s New Arrivals section.
- Explore a responsive banner with three Swiper slides.
- Register and log in using email and password or Google through BetterAuth.
- Access private pages and return to the requested page after login.
- Add books with an ImgBB cover upload, category, description, and total copies.
- Edit your own books using a prefilled form.
- Delete your books through a custom confirmation modal.
- Borrow available books for 14 days.
- View active loans and return books from My Borrows.
- Automatically decrease available copies when borrowing and increase them when returning.
- Prevent users from borrowing the same book twice while an active loan exists.
- Protect private API operations with JWT validation and ownership checks.
- Display success and error feedback through Sonner toasts.
- Use the application on mobile, tablet, and desktop devices.
- View your profile and navigate back home from a custom 404 page.

## Technology Stack

| Area | Technologies |
| --- | --- |
| Frontend | Next.js App Router, React, JavaScript |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui with Base UI |
| Authentication | BetterAuth with MongoDB Adapter |
| Authorization | JWT |
| Backend | Express.js |
| Database | MongoDB |
| Image Hosting | ImgBB |
| Slider | Swiper |
| Notifications | Sonner |

## Run Locally

### 1. Clone the client repository

```bash
git clone https://github.com/jstashin/booknook-client.git
cd booknook-client
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file beside `package.json`.

If you already use `.env`, update that file instead of keeping duplicate values in both files.

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
MONGODB_URI=YOUR_MONGODB_CONNECTION_STRING
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=YOUR_RANDOM_SECRET
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET
IMGBB_API_KEY=YOUR_IMGBB_API_KEY
```

Generate a random BetterAuth secret with:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Use the same MongoDB cluster as the backend. The authentication configuration uses the `booknook` database.

Keep environment files and credentials out of Git.

### 4. Configure Google OAuth

Create a Web application OAuth client in Google Cloud Console.

Add this local callback URL to its authorized redirect URIs:

```text
http://localhost:3000/api/auth/callback/google
```

If the Google OAuth application is in testing mode, add the accounts needed for testing as test users.

### 5. Start the backend

Clone and configure the server repository:

```bash
git clone https://github.com/jstashin/booknook-server.git
cd booknook-server
npm install
```

Create the server’s `.env` file:

```env
PORT=5000
CLIENT_URL=http://localhost:3000
MONGODB_URI=YOUR_MONGODB_CONNECTION_STRING
```

Start the server:

```bash
node index.js
```

MongoDB Atlas or a replica set is required for borrowing and return transactions.

### 6. Start the frontend

In the client directory, run:

```bash
npm run dev
```

Open http://localhost:3000.

Restart the frontend after changing environment variables.

## Available Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Application Routes

| Route | Access | Purpose |
| --- | --- | --- |
| `/` | Public | Home page |
| `/books` | Public | Browse all books |
| `/books/[id]` | Private | Book details and borrowing |
| `/add-book` | Private | Add a book |
| `/my-books` | Private | Manage your books |
| `/edit-book/[id]` | Private, owner only | Edit your book |
| `/my-borrows` | Private | View and return borrowed books |
| `/profile` | Private | View your profile |
| `/login` | Public | Log in |
| `/register` | Public | Create an account |

## Authentication

BetterAuth handles authentication through Next.js and stores authentication data in MongoDB.

- Passwords require at least six characters.
- Passwords must contain uppercase and lowercase letters.
- Email/password registration redirects users to Login.
- Google registration redirects users to Home.
- Private pages check the current session.
- Protected Express requests include a BetterAuth JWT.
- Email verification and password-reset delivery are omitted for the assignment.

## Book Covers

The authenticated cover-upload endpoint uploads book images to ImgBB.

Supported files:

- JPG
- PNG
- WebP
- Maximum size: 2 MB

The ImgBB API key is stored on the Next.js server.

## Borrowing Rules

- Readers must log in before borrowing.
- Each loan lasts 14 days.
- A user can have only one active loan for the same book.
- Books with zero available copies cannot be borrowed.
- Borrowing decreases available copies by one.
- Returning increases available copies by one.
- Books with active loans cannot be deleted.
- Only the book’s owner can edit or delete it.

## Deployment

Deploy the Next.js frontend and Express backend separately.

Before testing the deployed application:

1. Set `NEXT_PUBLIC_API_URL` to the deployed backend origin.
2. Set `BETTER_AUTH_URL` to the deployed frontend origin.
3. Set the backend’s `CLIENT_URL` to the same frontend origin.
4. Configure all database, authentication, Google, and ImgBB credentials in the hosting dashboards.
5. Add the production Google callback URL:

   ```text
   https://YOUR_FRONTEND_DOMAIN/api/auth/callback/google
   ```

6. Redeploy and test authentication, private-route refresh, cover uploads, borrowing, and returns.
7. Replace the Live Website placeholder in this README with the actual deployed URL.



GitHub: https://github.com/jstashin