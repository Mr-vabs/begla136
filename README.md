# BEGLA136 Subjective Quiz App ✍️📘

---

> A focused and editable answer-writing app for **BEGLA136: English at the Workplace (IGNOU)**  
> Built using React + TypeScript, styled with Tailwind CSS, and deployed via Netlify.  
> Supports PDF export, per-question saving, word count, and summary view.

[Netlify Status Badge]

👉 **Live Demo:** https://begla136.netlify.app/  
📝 Write your own answers, auto-save them, and export to PDF  
📚 Tailored for IGNOU’s BEGLA-136 TEE subjective exam

---

## 💻 Tech Stack

- React (Vite)
- TypeScript
- Tailwind CSS
- jsPDF
- Netlify

---

## 📁 Project Structure

```
.
├── README.md
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── public
├── src
│   ├── App.tsx
│   ├── components
│   │   └── AnswerEditor.tsx
│   ├── data
│   │   └── begla136-june2022.json
│   ├── index.css
│   ├── main.tsx
│   ├── pages
│   │   ├── QuizPage.tsx
│   │   └── SummaryPage.tsx
│   ├── types
│   │   └── question.ts
│   └── vite-env.d.ts
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

---

## 🚀 Features

- Answer editor with auto-save
- Export answers to PDF
- Per-question word count
- Save status for each question
- Section-wise layout (A, B, C)
- Summary view and navigation
- Responsive UI
- Persistent data in localStorage

---

## 🧪 Sample Inputs

- Name: `Vaibhav`
- Session: `June 2022`

---

## 🛠️ Setup & Development

```bash
git clone https://github.com/Mr-vabs/begla136.git
cd begla136
npm install
npm run dev
```

## 🔨 Build for Production

```bash
npm run build
```

---

## 🚢 Deployment (Netlify)

1. Push code to GitHub
2. Connect to Netlify
3. Set:
   - Build command: `npm run build`
   - Publish directory: `dist`

---

## 🙏 Credits

Made with ❤️ by **Vaibhav Kasaudhan**  
IGNOU content used for academic purposes under fair use.

---