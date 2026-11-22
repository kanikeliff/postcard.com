# Postcard

A web app for designing a digital postcard and sending it to a friend as a private link.

## What it does

- **Design:** pick one of 5 templates or upload your own image, choose title and body fonts from 6 options, align the text, sign it, and see a live preview while you edit.
- **Send:** each postcard gets a random share token and a public page at `/p/<token>`. The recipient gets the link by email through EmailJS. If EmailJS isn't configured, the app opens your mail client with the link filled in.
- **Accounts:** register and log in with Supabase Auth. Creating, sent, inbox, and profile pages sit behind a protected route.
- **Inbox:** see the postcards that were sent to your email address, next to the ones you sent.

## Tech stack

| Layer | Tools |
|---|---|
| Frontend | React 19, React Router 7, Vite, Tailwind CSS |
| Auth and data | Supabase (Auth + Postgres table `postcards`) |
| Email | EmailJS, with a `mailto:` fallback |
| Hosting | Netlify (SPA redirect in `netlify.toml`) |

## Project structure
postcard-app/src/
├── app/ router and providers
├── pages/ Home, Create, Sent, Inbox, Profile, Login, Register, PublicPostcard
├── components/
│ ├── postcard/ Editor, Preview, TemplatePicker, FontPicker, DeliveryPanel, Card
│ └── ui/ Button, Input, Select, Textarea, Toast, ProtectedRoute, PageShell
├── services/ postcardService (Supabase queries), emailService (EmailJS)
├── context/ AuthContext
├── hooks/ usePostcardDraft, useToast
└── lib/ supabase client, validators, share-token helper


## Run it locally

```bash
cd postcard-app
npm install
cp ../.env.example .env      # then fill in your own keys
npm run dev
```

| Variable | Purpose |
|---|---|
| `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` | Supabase project |
| `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY` | EmailJS (optional) |
| `VITE_APP_URL` | Base URL used in share links |

## What I'd do next

- Row-level security policies so users can only read their own sent and received postcards.
- Store uploaded images in Supabase Storage instead of inline base64.
- Tests for the validators and the share-token flow.

## Author

Built solo by [Elif Kanık](https://github.com/kanikeliff).
