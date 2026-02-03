export function formatDate(input: any): any {
  if (!input) {
    return '';
  }
  return new Date(input).toLocaleDateString();
}
