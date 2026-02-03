// ISSUE #9 (LOW): No proper TypeScript types - 'any' used everywhere
// This defeats the purpose of using TypeScript and hides bugs

export function formatDate(date: any): any {
  return new Date(date).toLocaleDateString();
}

export function formatCurrency(amount: any, currency: any): any {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency || 'USD',
  }).format(amount);
}

export function formatUser(user: any): any {
  return {
    ...user,
    fullName: `${user.firstName} ${user.lastName}`,
    initials: `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`,
  };
}

export function formatNumber(num: any): any {
  return new Intl.NumberFormat().format(num);
}

// Should have proper types:
//
// interface User {
//   firstName: string;
//   lastName: string;
//   email: string;
// }
//
// interface FormattedUser extends User {
//   fullName: string;
//   initials: string;
// }
//
// export function formatDate(date: Date | string): string {
//   return new Date(date).toLocaleDateString();
// }
//
// export function formatCurrency(amount: number, currency: string = 'USD'): string {
//   return new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency,
//   }).format(amount);
// }
//
// export function formatUser(user: User): FormattedUser {
//   return {
//     ...user,
//     fullName: `${user.firstName} ${user.lastName}`,
//     initials: `${user.firstName[0]}${user.lastName[0]}`,
//   };
// }
