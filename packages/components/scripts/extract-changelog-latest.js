import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import process from 'process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function extractLatestChangelog() {
  try {
    const changelogPath = path.join(__dirname, '../CHANGELOG.md');
    const storybookStatic = path.join(__dirname, '../storybook-static');
    const outputPath = path.join(storybookStatic, 'changelog-latest.json');

    if (!fs.existsSync(changelogPath)) {
      console.error('CHANGELOG.md not found.');
      process.exit(1);
    }

    if (!fs.existsSync(storybookStatic)) {
      fs.mkdirSync(storybookStatic, { recursive: true });
    }

    const changelog = fs.readFileSync(changelogPath, 'utf8');
    const lines = changelog.split('\n').map((line) => line.replace(/\r$/, ''));

    let version = '';
    let date = '';
    const features = [];
    const fixes = [];

    let currentSection = null;
    let foundFirstVersion = false;

    for (const line of lines) {
      const versionMatch = line.match(/^## (\d+\.\d+\.\d+) \((\d{4}-\d{2}-\d{2})\)/);
      if (versionMatch) {
        if (foundFirstVersion) {
          break;
        }
        version = versionMatch[1];
        date = versionMatch[2];
        foundFirstVersion = true;
        continue;
      }

      if (!foundFirstVersion) continue;

      if (/Features/i.test(line) && line.startsWith('###')) {
        currentSection = 'features';
        continue;
      }
      if (/Fixes/i.test(line) && line.startsWith('###')) {
        currentSection = 'fixes';
        continue;
      }
      if (line.startsWith('###')) {
        currentSection = null;
        continue;
      }

      if (line.startsWith('-') && currentSection) {
        const listItemMatch = line.match(/^-\s+\*\*([^*]+)\*\*:?\s*(.*)$/);
        if (listItemMatch) {
          const scope = listItemMatch[1].replace(/:$/, '').trim();
          const description = listItemMatch[2].trim();

          if (currentSection === 'features') {
            features.push({ scope, description });
          } else if (currentSection === 'fixes') {
            fixes.push({ scope, description });
          }
        }
      }
    }

    const result = {
      version,
      date,
      features,
      fixes,
    };

    fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));
    console.log(`✓ Extracted latest changelog: v${version} (${date})`);
    console.log(`  - Features: ${features.length}`);
    console.log(`  - Fixes: ${fixes.length}`);
  } catch (error) {
    console.error('Error extracting changelog:', error);
    process.exit(1);
  }
}

extractLatestChangelog();
