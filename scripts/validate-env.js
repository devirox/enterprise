// scripts/validate-env.js
// Checks for valid URL environment variables and prints warnings if invalid

require('dotenv').config();

const requiredUrls = [
  'NEXTAUTH_URL',
  'NEXT_PUBLIC_APP_ORIGIN',
  'NEXT_PUBLIC_BASE_URL',
];

let hasError = false;

for (const key of requiredUrls) {
  const value = process.env[key];
  try {
    if (!value) throw new Error('Missing');
    new URL(value);
  } catch (e) {
    console.error(`\x1b[31m[ENV ERROR]\x1b[0m ${key} is invalid or missing: "${value}"`);
    hasError = true;
  }
}

if (hasError) {
  process.exit(1);
} else {
  console.log('\x1b[32m[ENV OK]\x1b[0m All required URL environment variables are valid.');
}
