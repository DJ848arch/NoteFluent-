/** Empty in `next dev`; `/NoteFluent-` for production/export (see next.config.ts). */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBasePath(path: string): string {
  if (!path.startsWith("/")) {
    return `${basePath}/${path}`;
  }
  return `${basePath}${path}`;
}
