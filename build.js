#!/usr/bin/env node
const fs = require("fs"), path = require("path"), { execSync } = require("child_process");
const root = __dirname;
const www = path.join(root, "www");

// 1. Compile Tailwind
console.log("Compiling Tailwind CSS...");
execSync("npx tailwindcss -i tailwind.src.css -o www/tailwind.css --minify", {
  cwd: root,
  stdio: "inherit"
});

// 2. Verify required artefacts
const required = [
  "index.html",
  "app.js",
  "tailwind.css",
  "vendor/react.production.min.js",
  "vendor/react-dom.production.min.js"
];
let ok = true;
for (const f of required) {
  const fp = path.join(www, f);
  if (!fs.existsSync(fp)) { console.error(`MISSING: www/${f}`); ok = false; }
  else {
    const size = fs.statSync(fp).size;
    if (size === 0) { console.error(`EMPTY: www/${f}`); ok = false; }
    else console.log(`OK: www/${f} (${(size/1024).toFixed(0)} KB)`);
  }
}

// 3. Verify image assets directory (used for counter + memory fallbacks)
const imgDir = path.join(www, "img");
if (fs.existsSync(imgDir)) {
  const allFiles = [];
  (function walk(d) {
    for (const f of fs.readdirSync(d)) {
      const fp = path.join(d, f);
      if (fs.statSync(fp).isDirectory()) walk(fp);
      else if (/\.(png|jpg|jpeg|webp|svg)$/i.test(f)) allFiles.push(fp);
    }
  })(imgDir);
  console.log(`OK: www/img/ (${allFiles.length} images)`);
}

if (!ok) process.exit(1);
console.log("\nBuild complete -- www/ ready for Capacitor sync.");
