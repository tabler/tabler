// remove-prettier-ignore.js
import { readFileSync, writeFileSync } from 'fs';
import { sync } from 'glob';

const patterns = [
   /\/\/ prettier-ignore[\s]*/g,
];

sync('dist/**/*.html').forEach(file => {
   let content = readFileSync(file, 'utf8');
   let modified = false;

   patterns.forEach(pattern => {
      const newContent = content.replace(pattern, '');
      if (newContent !== content) {
         content = newContent;
         modified = true;
      }
   });

   if (modified) {
      writeFileSync(file, content);
      console.log(`Cleaned: ${file}`);
   }
});
