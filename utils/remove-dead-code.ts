import fs from 'fs';
import path from 'path';

/* -------------------------------- Constants ------------------------------- */

const projectRoot = path.resolve('./');

// Items that will be ignored during search
const itemsToIgnore = {
  dirs: new Set(['.git', '.next', 'node_modules', 'public']),
  files: new Set(['.prettierrc.js', 'next-env.d.ts']),
};

// Items that should not be deleted
const itemsToBypass = {
  dirs: ['app'],
  files: [
    'middleware.ts',
    'eslint.config.mjs',
    'next.config.ts',
    'postcss.config.js',
    'remove-dead-code.ts',
  ],
};

const validExtensions = new Set([
  '.js',
  '.ts',
  '.jsx',
  '.tsx',
  '.cjs',
  '.cts',
  '.mjs',
  '.mts',
  '.css',
]);

/* --------------------------------- Script --------------------------------- */

function getAllFiles(dir: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const itemPath = path.join(dir, file);
    if (fs.statSync(itemPath).isDirectory()) {
      if (itemsToIgnore.dirs.has(path.basename(itemPath))) return;
      getAllFiles(itemPath, fileList);
    } else {
      if (itemsToIgnore.files.has(path.basename(itemPath))) return;
      if (!validExtensions.has(path.extname(itemPath))) return;
      fileList.push(itemPath);
    }
  });
  return fileList;
}

function findDeadFiles(files: string[]): string[] {
  const deadFiles: string[] = [];
  files.forEach((file) => {
    const isBypassFile = itemsToBypass.files.some((f) => file.endsWith(f));
    const isInBypassDir = itemsToBypass.dirs.some((d) =>
      file.startsWith(path.join(projectRoot, d))
    );
    if (isBypassFile || isInBypassDir) return;

    const isReferenced = files.some((otherFile) => {
      if (otherFile === file) return false;
      const otherContent = fs.readFileSync(otherFile, 'utf-8');
      let baseName = path.basename(file, path.extname(file));
      if (baseName === 'index')
        baseName = path.dirname(file).split(path.sep).at(-1)!;
      const importRegex = new RegExp(`/${baseName}`, 'g');
      return importRegex.test(otherContent);
    });

    if (!isReferenced) {
      deadFiles.push(file);
    }
  });
  return deadFiles;
}

const allFiles = getAllFiles(projectRoot);
const deadFiles = findDeadFiles(allFiles);

if (deadFiles.length > 0) {
  console.log(`Dead files found: ${deadFiles.length}`);
} else {
  console.log('No dead files found. Your project is clean!');
}

deadFiles.forEach((file) => {
  console.log(` - File: ${path.relative(projectRoot, file)}`);
  // fs.unlink(file, (err) => {
  //   if (err) {
  //     console.error(
  //       ` - x Error removing file: ${path.relative(projectRoot, file)}`
  //     );
  //     return;
  //   }
  //   console.log(` - ✓ Removed file: ${path.relative(projectRoot, file)}`);
  // });
});
