/** @type {import('@ladle/react').UserConfig} */
export default {
  stories: "src/**/*.stories.{ts,tsx}",
  addons: {
    control: { enabled: true },
    a11y: { enabled: true },
    theme: { enabled: true },
    source: { enabled: true },
    width: { enabled: true },
  },
  outDir: "build",
};
