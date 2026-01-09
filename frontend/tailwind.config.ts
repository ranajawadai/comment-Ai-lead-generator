import type { Config } from "tailwindcss"

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#0f172a",
                foreground: "#e2e8f0",
                primary: "#3b82f6",
                secondary: "#64748b",
                accent: "#8b5cf6",
                success: "#10b981",
                warning: "#f59e0b",
                danger: "#ef4444",
            },
        },
    },
    plugins: [],
}
export default config