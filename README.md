# Postcard — Friends Letter Sender App

```
██████╗  ██████╗ ███████╗████████╗ ██████╗ █████╗ ██████╗ ██████╗
██╔══██╗██╔═══██╗██╔════╝╚══██╔══╝██╔════╝██╔══██╗██╔══██╗██╔══██╗
██████╔╝██║   ██║███████╗   ██║   ██║     ███████║██████╔╝██║  ██║
██╔═══╝ ██║   ██║╚════██║   ██║   ██║     ██╔══██║██╔══██╗██║  ██║
██║     ╚██████╔╝███████║   ██║   ╚██████╗██║  ██║██║  ██║██████╔╝
╚═╝      ╚═════╝ ╚══════╝   ╚═╝    ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝

                  💌  Send heartfelt letters to the people you love.
```

> A friends letter sender app built with **ReactJS + Vite + Tailwind CSS**.
> Create, preview, and send beautiful postcards via Email, WhatsApp, or SMS — no backend required.

---

## 📁 File Structure

```
postcard-app/
├── src/
│   ├── components/
│   │   ├── PostcardForm.jsx          # Controlled form (create / edit)
│   │   ├── PostcardCard.jsx          # Card list item
│   │   ├── PostcardPreview.jsx       # Live preview
│   │   ├── ThemePicker.jsx           # Theme selector
│   │   └── DeliveryMethodSelect.jsx  # Email / WhatsApp / SMS picker
│   ├── pages/
│   │   ├── HomePage.jsx              # Home — list all postcards
│   │   ├── CreatePostcardPage.jsx    # Create a new postcard
│   │   └── EditPostcardPage.jsx      # Edit an existing postcard
│   ├── interfaces/
│   │   └── postcard.js               # Data model + theme constants
│   ├── utils/
│   │   ├── localStorage.js           # CRUD helpers
│   │   ├── deliveryLinks.js          # Send dispatcher
│   │   └── emailService.js           # EmailJS integration
│   ├── App.jsx                       # React Router setup
│   ├── main.jsx                      # App entry point
│   └── index.css                     # Tailwind + fonts
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── netlify.toml                      # SPA redirect rule
├── .env.example                      # EmailJS key template
└── .gitignore
```

---

## ✅ CRUD Summary

| Operation  | Where                        |
|------------|------------------------------|
| **Create** | CreatePostcardPage           |
| **Read**   | HomePage (list all)          |
| **Update** | EditPostcardPage             |
| **Delete** | PostcardCard → Delete button |

---

## 🚀 Getting Started

### 1. Clone or download the project

If you already have the files, skip to step 2.

To scaffold from scratch:
```bash
npm create vite@latest postcard-app -- --template react
cd postcard-app
```

### 2. Install dependencies

```bash
npm install
npm install react-router-dom @emailjs/browser
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 3. Configure Tailwind

`tailwind.config.js`:
```js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: { extend: {} },
  plugins: [],
};
```

Add to the top of `src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 4. Set up environment variables

```bash
cp .env.example .env
```

Fill in your EmailJS credentials in `.env`:
```env
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxxxxxx
```

> See `EMAILJS_SETUP.md` for a step-by-step guide on getting these keys.

### 5. Start the dev server

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 🐙 Uploading to GitHub

### 1. Create a new repository on GitHub

- Go to github.com → **New repository**
- Repository name: `postcard-app`
- Visibility: **Public**
- Do NOT add a README (we already have one)
- Click **Create repository**

### 2. Initialize git in your project folder

```bash
cd postcard-app
git init
git add .
git commit -m "initial commit: postcard app"
```

### 3. Link to GitHub and push

Use the remote URL shown on your GitHub repo page:

```bash
git remote add origin https://github.com/YOUR_USERNAME/postcard-app.git
git branch -M main
git push -u origin main
```

> Replace `YOUR_USERNAME` with your actual GitHub username.

---

## 🌐 Deploying to Netlify

### Option 1: Netlify Drop (easiest)

1. Run `npm run build` → a `dist/` folder is created
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
3. Drag and drop the `dist/` folder
4. Netlify gives you a live URL instantly ✅

### Option 2: GitHub auto-deploy (recommended)

1. [app.netlify.com](https://app.netlify.com) → **Add new site** → **Import an existing project**
2. Select **GitHub** → choose `postcard-app`
3. Build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Add environment variables under **Site Configuration → Environment Variables**:
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`
5. Click **Deploy site** — live in seconds

> The `netlify.toml` file ensures React Router pages like `/edit/:id` do not 404 on refresh.

### After deploy

Netlify gives you a URL like:
```
https://postcard-app-abc123.netlify.app
```

Paste this into your project submission form.

---

## 🎨 Themes

| Theme ID   | Name           | Color           |
|------------|----------------|-----------------|
| `vintage`  | Vintage Paper  | Cream / brown   |
| `softpink` | Soft Pink      | Pink            |
| `midnight` | Midnight Ink   | Dark navy       |
| `floral`   | Floral Note    | Green / natural |
| `minimal`  | Minimal White  | White           |
| `custom`   | Your own image | Base64 upload   |

---

## 📦 Tech Stack

| Tool | Purpose |
|------|---------|
| **ReactJS** (via Vite) | UI framework |
| **React Router DOM v6** | Client-side routing |
| **Tailwind CSS** | Styling |
| **localStorage** | Data persistence (no backend) |
| **EmailJS** | In-browser email sending |
| **Netlify** | Hosting & deployment |

---

## 📸 Screenshot

> After running the app, take a screenshot, save it as `screenshot.png` in the project root, and add it here:

```md
![Postcard App](./screenshot.png)
```

---

## 📄 License

MIT — free to use for educational purposes.
