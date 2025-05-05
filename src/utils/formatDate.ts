/**
 * Format a date to a readable string
 */
export function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Format a date to include time
 */
export function formatDateTime(date: Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Get relative time (e.g., "2 days ago")
 */
export function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffInMs = now.getTime() - new Date(date).getTime();
  
  const diffInSecs = Math.floor(diffInMs / 1000);
  const diffInMins = Math.floor(diffInSecs / 60);
  const diffInHours = Math.floor(diffInMins / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  
  if (diffInSecs < 60) {
    return 'just now';
  } else if (diffInMins < 60) {
    return `${diffInMins} ${diffInMins === 1 ? 'minute' : 'minutes'} ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
  } else if (diffInDays < 30) {
    return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
  } else {
    return formatDate(date);
  }
}