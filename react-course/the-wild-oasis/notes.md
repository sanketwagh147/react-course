### Configure eslint

`npm install --sav-dev vite-plugin-eslint eslint-config-react-appp eslint`

### Create .eslintrc.json

Add `{
    "extends": "react-app"
}`

### modify vite.config.js

`
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
plugins: [react(), eslint()],
});

`

### Delete assets folder App.css index.css as they are not used
