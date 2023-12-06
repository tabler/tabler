import { Plan } from "@/types";

export const groupBy = function (xs, key) {
  return xs.reduce(function (rv, x) {
    ;(rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

export const sortByKeys = function (xs) {
  return Object.keys(xs)
    .sort()
    .reduce((obj, key) => {
      obj[key] = xs[key];
      return obj;
    }, {});
};

export const toPascalCase = function (text: string) {
  return text
    .replace(new RegExp(/[-_]+/, 'g'), ' ')
    .replace(new RegExp(/[^\w\s]/, 'g'), '')
    .replace(
      new RegExp(/\s+(.)(\w+)/, 'g'),
      ($1, $2, $3) => `${$2.toUpperCase() + $3.toLowerCase()}`
    )
    .replace(new RegExp(/\s/, 'g'), '')
    .replace(new RegExp(/\w/), (s) => s.toUpperCase());
};

export const baseUrl = {
  development: 'http://localhost:3000',
  production: 'https://tabler-icons.io',
}[process.env.NODE_ENV];

export const getCurrentBrand = (hostname: string) => {
  if (hostname && hostname.match(/tabler-icons/)) {
    return 'tabler-icons';
  }

  return 'tabler-ui';
};

export const getNextAuthErrorMessage = (error: string): string => {
  // Nextauth errors
  // https://next-auth.js.org/configuration/pages#sign-in-page
  // OAuthSignin: Error in constructing an authorization URL (1, 2, 3),
  // OAuthCallback: Error in handling the response (1, 2, 3) from an OAuth provider.
  // OAuthCreateAccount: Could not create OAuth provider user in the database.
  // EmailCreateAccount: Could not create email provider user in the database.
  // Callback: Error in the OAuth callback handler route
  // OAuthAccountNotLinked: If the email on the account is already linked, but not with this OAuth account
  // EmailSignin: Sending the e-mail with the verification token failed
  // CredentialsSignin: The authorize callback returned null in the Credentials provider. We don't recommend providing information about which part of the credentials were wrong, as it might be abused by malicious hackers.
  // SessionRequired: The content of this page requires you to be signed in at all times. See useSession for configuration.
  // Default: Catch all, will apply, if none of the above matched

  switch (error) {
    case 'OAuthSignin':
    case 'OAuthCallback':  
    case 'OAuthCreateAccount':   
    case 'EmailCreateAccount':
    case 'Callback':
      return 'Try signing in with a different account.';
    case 'OAuthAccountNotLinked':
      return 'To confirm your identity, sign in with the same account you used originally.';
    case 'EmailSignin':
      return 'The e-mail could not be sent.';
    case 'CredentialsSignin':
      return 'Sign in failed. Check the details you provided are correct.';
    case 'SessionRequired':
      return 'Please sign in to access this page.';
    case 'Default':
    default:
      return 'Unable to sign in.';
  }  
};

export const isPlanFeatured = (plan: Plan) => {
  return plan.variantName === 'Advanced'
}