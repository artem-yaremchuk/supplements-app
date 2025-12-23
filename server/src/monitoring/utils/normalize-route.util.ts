export function normalizeRoute(path: string): string {
  return (
    path
      // uuid
      .replace(/\/[0-9a-fA-F-]{36}/g, '/:uuid')
  );
}
