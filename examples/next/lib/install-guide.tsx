export function InstallGuide() {
  return <>
    <h2>Choose your package manager</h2>
    <p>npm, pnpm, Yarn, and Bun install the same @fwenthehunter/friendly-ui package. Choose one command above and keep using your application’s existing manager and lockfile. React 19 and React DOM 19 are peer dependencies.</p>
    <p>The package includes compiled JavaScript, types, CSS, and the MIT license. No install-time build or documentation server is required. You do not need to clone this repository to use Friendly UI.</p>
    <h2>Test local changes before a release</h2>
    <p>For development of Friendly UI itself, this repository uses npm workspaces. Build and pack the package, then install the tarball into a separate application. Replace the paths below with your actual tarball path.</p>
    <pre><code>{`# In the Friendly UI repository\nnpm install\nnpm run build -w @fwenthehunter/friendly-ui\nnpm pack -w @fwenthehunter/friendly-ui\n\n# In your own app, choose ONE\nnpm install /path/to/fwenthehunter-friendly-ui-0.2.0.tgz\npnpm add /path/to/fwenthehunter-friendly-ui-0.2.0.tgz\nyarn add file:/path/to/fwenthehunter-friendly-ui-0.2.0.tgz\nbun add /path/to/fwenthehunter-friendly-ui-0.2.0.tgz`}</code></pre>
  </>;
}
