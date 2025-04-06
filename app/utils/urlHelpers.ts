export function buildImageUrl(baseUrl: string, relativePath: string): string {
  if (!baseUrl || !relativePath) {
    return '';
  }
  return `${baseUrl}${relativePath}`;
}