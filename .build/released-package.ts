// Downloads the last release of `@tabler/core` from npm, once, and returns where
// it was unpacked. `check-compat` compares its public surface with the working
// tree; `check-compat-fixture` runs a 1.5-style project against both.
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

export const pkgName = '@tabler/core'
const coreDir = 'core'
const cacheDir = 'node_modules/.cache/check-compat'

const registry = 'https://registry.npmjs.org'

export async function releasedPackage(): Promise<{ dir: string; version: string }> {
  const local = JSON.parse(readFileSync(join(coreDir, 'package.json'), 'utf8')).version as string
  // On the versions PR the local version is not published yet: compare with `latest`.
  let version = local
  let response = await fetch(`${registry}/${pkgName}/${version}`)
  if (response.status === 404) {
    response = await fetch(`${registry}/${pkgName}/latest`)
  }
  if (!response.ok) throw new Error(`npm registry answered ${response.status} for ${pkgName}`)
  const manifest = (await response.json()) as { version: string; dist: { tarball: string } }
  version = manifest.version

  const dir = join(cacheDir, version)
  if (!existsSync(join(dir, 'package', 'package.json'))) {
    mkdirSync(dir, { recursive: true })
    const tarball = await fetch(manifest.dist.tarball)
    if (!tarball.ok) throw new Error(`could not download ${manifest.dist.tarball}: ${tarball.status}`)
    const archive = join(dir, 'package.tgz')
    writeFileSync(archive, Buffer.from(await tarball.arrayBuffer()))
    execFileSync('tar', ['-xzf', archive, '-C', dir])
  }
  return { dir: join(dir, 'package'), version }
}
