import type { Story } from "@ladle/react";
import { ThemeProvider, useTheme } from "./theme-provider";

export default {
  title: "ThemeProvider",
};

function ThemeSwitcher() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border p-4">
      <p className="text-sm text-foreground">
        Selected: <strong>{theme}</strong> &middot; Resolved:{" "}
        <strong>{resolvedTheme}</strong>
      </p>
      <div className="flex gap-2">
        {(["light", "dark", "system"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTheme(t)}
            className="rounded-md border border-border px-3 py-1.5 text-sm"
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}

export const Default: Story = () => (
  <ThemeProvider defaultTheme="system">
    <ThemeSwitcher />
  </ThemeProvider>
);
