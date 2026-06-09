Based on your package.json, to run a single test file with Playwright, use:

```
  npx playwright test path/to/your-test-file.spec.ts
```

  Or if you want to add it as an npm script, add this to your scripts section:

  "test:playwright:file": "playwright test --testPathPattern"

  Then run it like:

```bash
  npm run test:playwright:file -- path/to/your-test-file.spec.ts
```

  However, the simplest approach is just using your existing test:playwright script with the file path appended:

```bash
  npm run test:playwright -- tests/example.spec.ts
```

  This passes the file path directly to playwright test, which already exists in your scripts. No new script needed.