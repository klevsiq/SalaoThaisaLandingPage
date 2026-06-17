import sharp from 'sharp'
import { readdir, stat, writeFile, readFile } from 'fs/promises'
import { join } from 'path'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const GALLERY_DIR = resolve(__dirname, '../public/assets/images/gallery')
const MAX_WIDTH = 800
const QUALITY = 82

const files = await readdir(GALLERY_DIR)
const webpFiles = files.filter(f => f.endsWith('.webp'))

console.log(`Otimizando ${webpFiles.length} imagens em ${GALLERY_DIR}...\n`)

let totalBefore = 0
let totalAfter = 0
const errors = []

for (const file of webpFiles) {
  try {
    const filePath = join(GALLERY_DIR, file)

    const before = (await stat(filePath)).size

    // Read the file into memory first so sharp releases the file handle
    const inputBuffer = await readFile(filePath)
    const meta = await sharp(inputBuffer).metadata()
    const needsResize = (meta.width ?? 0) > MAX_WIDTH

    const outputBuffer = await sharp(inputBuffer)
      .resize(needsResize ? { width: MAX_WIDTH, withoutEnlargement: true } : undefined)
      .webp({ quality: QUALITY })
      .toBuffer()

    // Write back to the same file (no file handle is held by sharp at this point)
    await writeFile(filePath, outputBuffer)

    const after = outputBuffer.length
    totalBefore += before
    totalAfter += after

    const saving = (((before - after) / before) * 100).toFixed(1)
    const arrow = needsResize ? `${meta.width}px→800px` : 'sem resize'
    console.log(`${file}: ${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB (-${saving}%) [${arrow}]`)
  } catch (err) {
    console.error(`Erro ao processar ${file}: ${err.message}`)
    errors.push(file)
  }
}

if (totalBefore > 0) {
  const totalSaving = (((totalBefore - totalAfter) / totalBefore) * 100).toFixed(1)
  console.log(`\nTotal: ${(totalBefore / 1024 / 1024).toFixed(1)}MB → ${(totalAfter / 1024 / 1024).toFixed(1)}MB (-${totalSaving}%)`)
}
console.log('Concluído.')

if (errors.length > 0) {
  console.error(`\nFalha ao processar ${errors.length} arquivo(s): ${errors.join(', ')}`)
  process.exit(1)
}
