#!/usr/bin/env node
const fs = require("fs"), path = require("path");
const www = path.join(__dirname, "www");
const required = [
  "index.html",
  "app-compiled.js",
  "vendor/react.production.min.js",
  "vendor/react-dom.production.min.js"
];
let ok = true;
for (const f of required) {
  const fp = path.join(www, f);
  if (!fs.existsSync(fp)) { console.error(`❌ Missing: www/${f}`); ok = false; }
  else console.log(`✅ www/${f} (${(fs.statSync(fp).size/1024).toFixed(0)} KB)`);
}
if (!ok) process.exit(1);
console.log("\n✨ Build complete — www/ ready for Capacitor sync.");
