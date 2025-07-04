const { execSync } = require('child_process');

// Get command-line args (excluding node and script name)
const args = process.argv.slice(2);

// Default app name
let app = 'question-bank';
let component;

if (args.length === 1) {
  component = args[0];
} else if (args.length === 2) {
  app = args[0];
  component = args[1];
} else {
  console.error(`
❌ Invalid number of arguments.

Usage:
  npm run test:component <component-name>
  npm run test:component <app-name> <component-name>

Examples:
  npm run test:component list-interview
  npm run test:component question-bank list-interview
`);
  process.exit(1);
}

const command = `npx nx test ${app} --testPathPattern="${component}.spec.ts"`;

console.log(`▶ Running test for:`);
console.log(`   App       : ${app}`);
console.log(`   Component : ${component}`);
console.log(`----------------------------------------`);

execSync(command, { stdio: 'inherit' });
