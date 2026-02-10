import fs from 'fs';
import path from 'path';

function copyFile(src, dest) {
  if (fs.existsSync(src)) {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
    console.log(`Copied: ${src} -> ${dest}`);
  }
}

function copyDir(srcDir, destDir) {
  if (fs.existsSync(srcDir)) {
    fs.mkdirSync(destDir, { recursive: true });
    const files = fs.readdirSync(srcDir);
    files.forEach((file) => {
      if (file.endsWith('.json')) {
        copyFile(path.join(srcDir, file), path.join(destDir, file));
      }
    });
  }
}

copyFile('custom-elements.json', 'storybook-static/custom-elements.json');

copyDir('../tokens/src/transformed-tokens', 'storybook-static/transformed-tokens');

copyFile('../tokens/src/transformed-tokens/float.json', 'storybook-static/float.json');

copyFile('../tokens/src/transformed-tokens/color.json', 'storybook-static/colors.json');
