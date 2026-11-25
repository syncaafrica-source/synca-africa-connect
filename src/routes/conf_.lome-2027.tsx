import { createFileRoute, redirect } from '@tanstack/react-router';

// Preserve existing bookmarks without serving the retired event page.
export const Route = createFileRoute('/conf_/lome-2027')({
  beforeLoad: () => {
    throw redirect({ to: '/conf', statusCode: 301, replace: true });
  },
});
