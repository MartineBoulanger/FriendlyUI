export function InstallGuide() {
  return (
    <>
      <h2>Choose your package manager</h2>
      <p>
        Friendly UI is a standard registry package. npm, pnpm, Yarn, and Bun can
        install the same published artifact; no separate edition is needed.
        React 19 and React DOM 19 are peer dependencies.
      </p>
      <p>
        The package is not published yet. Until release, build and pack it in
        this repository, then choose one of these commands in your application.
        Replace the tarball path with the real absolute path.
      </p>
      <pre>
        <code>{`# Build and pack this repository using its existing npm workspace\nnpm install\nnpm run build -w @friendly-ui/react\nnpm pack -w @friendly-ui/react\n\n# In your own app, choose ONE\nnpm install /path/to/friendly-ui-react-0.1.0.tgz\npnpm add /path/to/friendly-ui-react-0.1.0.tgz\nyarn add file:/path/to/friendly-ui-react-0.1.0.tgz\nbun add /path/to/friendly-ui-react-0.1.0.tgz`}</code>
      </pre>
      <h2>After the npm release</h2>
      <p>
        Once published under this name, use one of the following. These registry
        commands are for the future release and do not install this unpublished
        workspace today.
      </p>
      <pre>
        <code>{`npm install @friendly-ui/react\npnpm add @friendly-ui/react\nyarn add @friendly-ui/react\nbun add @friendly-ui/react`}</code>
      </pre>
      <p>
        Use your application’s existing package manager and lockfile. This
        repository’s npm workspaces and package-lock.json are development
        tooling; they do not require consumers to use npm. No install-time build
        script is required because the packed package includes its compiled
        JavaScript, types, and CSS.
      </p>
    </>
  );
}
