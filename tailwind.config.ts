import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#1B3A5C",
          light: "#2A4F78",
          dark: "#122740",
        },
        gold: {
          DEFAULT: "#C9942E",
          light: "#D4A84A",
          dark: "#B07D1F",
        },
        warm: {
          light: "#F5F2EC",
          medium: "#E8E2D6",
        },
        dark: "#2C2C2C",
        success: "#2D8A4E",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        heading: ["var(--font-jakarta)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        logo: ["var(--font-playfair)", "serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      typography: {
        DEFAULT: {
          css: {
            "--tw-prose-body": "#2C2C2C",
            "--tw-prose-headings": "#1B3A5C",
            "--tw-prose-links": "#C9942E",
            "--tw-prose-bold": "#1B3A5C",
            "--tw-prose-bullets": "#C9942E",
            "--tw-prose-counters": "#C9942E",
            "--tw-prose-hr": "#E8E2D6",
            "--tw-prose-quotes": "#1B3A5C",
            "--tw-prose-quote-borders": "#C9942E",
            "--tw-prose-captions": "#6B7280",
            maxWidth: "none",
            h2: {
              fontFamily: "var(--font-jakarta), sans-serif",
              color: "#1B3A5C",
              fontWeight: "700",
              fontSize: "1.625rem",
              marginTop: "2.5rem",
              marginBottom: "1rem",
              paddingBottom: "0.625rem",
              borderBottomWidth: "2px",
              borderBottomColor: "#E8E2D6",
              lineHeight: "1.3",
            },
            h3: {
              fontFamily: "var(--font-jakarta), sans-serif",
              color: "#2A4F78",
              fontWeight: "600",
              fontSize: "1.25rem",
              marginTop: "1.75rem",
              marginBottom: "0.75rem",
              lineHeight: "1.4",
            },
            p: {
              color: "#2C2C2C",
              lineHeight: "1.8",
              marginTop: "1.25rem",
              marginBottom: "1.25rem",
            },
            a: {
              color: "#C9942E",
              fontWeight: "600",
              textDecoration: "none",
              borderBottomWidth: "1px",
              borderBottomColor: "transparent",
              transition: "border-color 0.2s ease, color 0.2s ease",
              "&:hover": {
                color: "#B07D1F",
                borderBottomColor: "#C9942E",
              },
            },
            strong: {
              color: "#1B3A5C",
              fontWeight: "700",
            },
            em: {
              fontStyle: "italic",
              color: "#2A4F78",
            },
            ul: {
              marginTop: "1rem",
              marginBottom: "1rem",
              paddingLeft: "1.5rem",
            },
            "ul > li": {
              paddingLeft: "0.5rem",
              marginTop: "0.5rem",
              marginBottom: "0.5rem",
              lineHeight: "1.7",
            },
            "ul > li::marker": {
              color: "#C9942E",
            },
            ol: {
              marginTop: "1rem",
              marginBottom: "1rem",
              paddingLeft: "1.5rem",
            },
            "ol > li": {
              paddingLeft: "0.5rem",
              marginTop: "0.5rem",
              marginBottom: "0.5rem",
              lineHeight: "1.7",
            },
            "ol > li::marker": {
              color: "#C9942E",
              fontWeight: "600",
            },
            blockquote: {
              borderLeftColor: "#C9942E",
              borderLeftWidth: "4px",
              backgroundColor: "#F5F2EC",
              paddingTop: "1rem",
              paddingBottom: "1rem",
              paddingLeft: "1.5rem",
              paddingRight: "1.5rem",
              borderRadius: "0 0.5rem 0.5rem 0",
              fontStyle: "normal",
              color: "#1B3A5C",
            },
            hr: {
              borderColor: "#E8E2D6",
              marginTop: "2.5rem",
              marginBottom: "2.5rem",
            },
          },
        },
        lg: {
          css: {
            h2: {
              fontSize: "1.875rem",
              marginTop: "3rem",
              marginBottom: "1.25rem",
            },
            h3: {
              fontSize: "1.375rem",
              marginTop: "2rem",
              marginBottom: "0.875rem",
            },
            p: {
              lineHeight: "1.85",
              fontSize: "1.0625rem",
            },
          },
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
  ],
};

export default config;
