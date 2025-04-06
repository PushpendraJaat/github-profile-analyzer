---

# 🔍 GitHub Profile Analyzer

Analyze any GitHub user's activity in style!  
A sleek and interactive web app built with **React**, **TypeScript**, **shadcn/ui**, and powered by **Bun**. 🚀

---

## ✨ Features

- 🔎 **GitHub User Search** – Enter any GitHub username to explore their profile.
- 📦 **Repository Insights** – View a list of public repositories with stars, forks, language stats & more.
- 📈 **Commit Activity Visualization** – See contribution trends over time with beautiful, interactive charts.
- ⚡ **Fast & Modern Stack** – Built with Vite, styled using Tailwind & shadcn components, and powered by Bun for blazing fast dev experience.

---

## ⚙️ Tech Stack

| Tech           | Role                              |
|----------------|-----------------------------------|
| ⚛️ React        | UI framework                      |
| 🟦 TypeScript   | Type-safe development             |
| 🌈 shadcn/ui    | Beautiful, accessible components |
| 💨 Tailwind CSS | Utility-first styling             |
| 🍞 Bun          | Package manager & dev server     |
| ⚡ Vite         | Super fast build tool             |

---

## 🛠️ Installation

> **Note**: Make sure you have **[Bun](https://bun.sh)** installed first.  
> Run: `bun --version` to confirm.

1. **Clone the repository**

   ```bash
   git clone https://github.com/PushpendraJaat/github-profile-analyzer.git
   cd github-profile-analyzer
   ```

2. **Install dependencies**

   ```bash
   bun install
   ```

3. **Run the dev server**

   ```bash
   bun run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser 🚀

---

## 🧭 Project Structure

```
├── public/               # Static assets
├── src/
│   ├── components/       # Reusable UI components (shadcn)
│   ├── App.tsx           # Main app component
│   ├── main.tsx          # Entry point
├── vite.config.ts        # Vite configuration
├── tsconfig.json         # TypeScript settings
├── bun.lockb             # Bun lockfile
```

---

## 🧪 How It Works

1. You enter a GitHub username.
2. The app fetches:
   - Profile info (name, bio, avatar, followers etc.)
   - All public repositories
   - Commit history from each repo
3. It processes the data and visualizes it through charts for easy analysis.

---

## 🧑‍💻 Contributing

Got ideas or improvements? PRs are welcome!  
Feel free to fork the repo, make your changes, and submit a pull request 🙌

---

## 📄 License

Licensed under the [MIT License](LICENSE).  
Free to use, modify, and distribute. 💖

---