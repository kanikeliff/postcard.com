# postcard.com
📬 Postcard — Friends Letter Sender App
Postcard is a React and Tailwind CSS based frontend project where users can create, list, update, and delete digital postcards. Users can choose a delivery method such as email, WhatsApp, or SMS, and personalize the card with preset artistic themes or uploaded images. The project uses localStorage for data persistence and is deployed on Netlify.

🚀 Tech Stack

    
    Framework: ReactJS (Vite)
    Styling: Tailwind CSS
    Storage: localStorage
    Deploy: Netlify
    Repo: GitHub


⚙️ Installation

    bashnpm create vite@latest postcard -- --template react
    cd postcard
    npm install
    npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p
    npm run dev

📁 File Structure
      
    postcard/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── PostcardForm.jsx
    │   │   ├── PostcardCard.jsx
    │   │   ├── ThemePicker.jsx
    │   │   ├── DeliveryMethodSelect.jsx
    │   │   └── PostcardPreview.jsx
    │   ├── pages/
    │   │   ├── HomePage.jsx
    │   │   ├── CreatePostcardPage.jsx
    │   │   └── EditPostcardPage.jsx
    │   ├── interfaces/
    │   │   └── postcard.js
    │   ├── utils/
    │   │   ├── localStorage.js
    │   │   └── deliveryLinks.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── tailwind.config.js
    ├── postcss.config.js
    └── package.json

🗂️ Data Model

    src/interfaces/postcard.js
    js/**
     * @typedef {Object} Postcard
     * @property {string} id
     * @property {string} recipientName
     * @property {string} title
     * @property {string} content
     * @property {'email'|'whatsapp'|'sms'} method
     * @property {string} contact
     * @property {string} theme
     * @property {string|null} customImage
     * @property {'draft'|'sent'} status
     * @property {string} createdAt
     */

✅ CRUD Operations
OperationFeatureCreateAdd a new postcard via formReadList all postcards on the Home pageUpdateEdit an existing postcardDeleteRemove a postcard from the list

💾 localStorage Logic

    js// Create
    const postcards = JSON.parse(localStorage.getItem("postcards")) || [];
    postcards.push(newPostcard);
    localStorage.setItem("postcards", JSON.stringify(postcards));
    
    // Read
    const postcards = JSON.parse(localStorage.getItem("postcards")) || [];
    
    // Update
    const updatedPostcards = postcards.map((item) =>
      item.id === id ? { ...item, ...updatedData } : item
    );
    localStorage.setItem("postcards", JSON.stringify(updatedPostcards));
    
    // Delete
    const filteredPostcards = postcards.filter((item) => item.id !== id);
    localStorage.setItem("postcards", JSON.stringify(filteredPostcards));
    
    📨 Delivery Link Logic
    js// Email
    const emailLink = `mailto:${contact}?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(content)}`;
    window.open(emailLink);
    
    // WhatsApp
    const whatsappLink = `https://wa.me/${contact}?text=${encodeURIComponent(content)}`;
    window.open(whatsappLink);
    
    // SMS
    const smsLink = `sms:${contact}?body=${encodeURIComponent(content)}`;
    window.open(smsLink);

🎨 Themes
Built-in artistic themes:

Vintage Paper
Soft Pink
Midnight Ink
Floral Note
Minimal White
Custom — upload your own background image


🌐 Deployment

    bash# Build
    npm run build

# Push to GitHub

    git init
    git add .
    git commit -m "Initial commit: Postcard project"
    git branch -M main
    git remote add origin https://github.com/YOUR_USERNAME/postcard.git
    git push -u origin main
    Netlify settings:
    
    Build command: npm run build
    Publish directory: dist


📸 Screenshots

Add at least one screenshot here before submission.
Recommended: Home page with 2–3 postcards listed, or compose form with live preview open.


📝 License
MIT
