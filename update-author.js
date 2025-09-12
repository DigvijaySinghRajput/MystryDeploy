#!/usr/bin/env node

/**
 * Script to update author information in package.json and layout.tsx
 * Usage: node update-author.js "Your Name" "your.email@example.com" "yourusername"
 */

const fs = require("fs");
const path = require("path");

// Get command line arguments
const [, , name, email, githubUsername] = process.argv;

if (!name || !email || !githubUsername) {
  console.log(
    'Usage: node update-author.js "Your Name" "your.email@example.com" "yourusername"'
  );
  console.log(
    'Example: node update-author.js "John Doe" "john@example.com" "johndoe"'
  );
  process.exit(1);
}

// Update package.json
const packageJsonPath = path.join(__dirname, "package.json");
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

packageJson.author = `${name} <${email}>`;
packageJson.repository = {
  type: "git",
  url: `https://github.com/${githubUsername}/mystry-world.git`,
};
packageJson.homepage = `https://github.com/${githubUsername}/mystry-world#readme`;
packageJson.bugs = {
  url: `https://github.com/${githubUsername}/mystry-world/issues`,
};

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
console.log("✅ Updated package.json");

// Update layout.tsx
const layoutPath = path.join(__dirname, "src", "app", "layout.tsx");
let layoutContent = fs.readFileSync(layoutPath, "utf8");

// Replace placeholder values
layoutContent = layoutContent.replace(/Your Name/g, name);
layoutContent = layoutContent.replace(/yourusername/g, githubUsername);
layoutContent = layoutContent.replace(/your-email@example.com/g, email);

fs.writeFileSync(layoutPath, layoutContent);
console.log("✅ Updated layout.tsx");

// Update README.md
const readmePath = path.join(__dirname, "README.md");
let readmeContent = fs.readFileSync(readmePath, "utf8");

readmeContent = readmeContent.replace(/yourusername/g, githubUsername);
readmeContent = readmeContent.replace(/Your Name/g, name);
readmeContent = readmeContent.replace(/your-email@example.com/g, email);

fs.writeFileSync(readmePath, readmeContent);
console.log("✅ Updated README.md");

console.log("\n🎉 All files updated successfully!");
console.log(`\nYour information:`);
console.log(`Name: ${name}`);
console.log(`Email: ${email}`);
console.log(`GitHub: ${githubUsername}`);
