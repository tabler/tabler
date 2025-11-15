import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// File paths (relative to core/.build directory)
const bootstrapPath = path.join(__dirname, '../node_modules/bootstrap/scss/_variables.scss');
const tablerPath = path.join(__dirname, '../scss/_variables.scss');

// Function to extract variable names from SCSS file
function extractVariables(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const variables = new Set();
  
  // Regex to find SCSS variables
  // Looks for patterns like: $variable-name: value
  // Includes variables in maps and lists
  const variableRegex = /\$([a-zA-Z0-9_-]+)\s*[:=]/g;
  
  let match;
  while ((match = variableRegex.exec(content)) !== null) {
    const varName = match[1];
    variables.add(varName);
  }
  
  return variables;
}

// Main function
function compareVariables() {
  console.log('Analyzing Bootstrap variables...');
  const bootstrapVars = extractVariables(bootstrapPath);
  console.log(`Found ${bootstrapVars.size} variables in Bootstrap\n`);
  
  console.log('Analyzing Tabler variables...');
  const tablerVars = extractVariables(tablerPath);
  console.log(`Found ${tablerVars.size} variables in Tabler\n`);
  
  // Find variables that are in Bootstrap but not in Tabler
  const missingInTabler = [];
  for (const varName of bootstrapVars) {
    if (!tablerVars.has(varName)) {
      missingInTabler.push(varName);
    }
  }
  
  // Sort alphabetically
  missingInTabler.sort();
  
  console.log('='.repeat(60));
  console.log(`Variables in Bootstrap that are missing in Tabler: ${missingInTabler.length}`);
  console.log('='.repeat(60));
  
  if (missingInTabler.length === 0) {
    console.log('All Bootstrap variables are present in Tabler!');
  } else {
    console.log('\nList of missing variables:\n');
    missingInTabler.forEach((varName, index) => {
      console.log(`${(index + 1).toString().padStart(4)}. $${varName}`);
    });
  }
  
  // Optionally: show statistics
  console.log('\n' + '='.repeat(60));
  console.log('Statistics:');
  console.log(`  Bootstrap: ${bootstrapVars.size} variables`);
  console.log(`  Tabler:    ${tablerVars.size} variables`);
  console.log(`  Missing:    ${missingInTabler.length} variables`);
  console.log(`  Coverage:   ${((1 - missingInTabler.length / bootstrapVars.size) * 100).toFixed(1)}%`);
  console.log('='.repeat(60));
}

// Run analysis
try {
  compareVariables();
} catch (error) {
  console.error('Error during analysis:', error.message);
  process.exit(1);
}