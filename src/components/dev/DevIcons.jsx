// Copilot sparkle icon for dev mode AI chat
export function CopilotIcon({ size = 18, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12 2L13.09 7.26L18 6L14.74 9.74L20 12L14.74 14.26L18 18L13.09 16.74L12 22L10.91 16.74L6 18L9.26 14.26L4 12L9.26 9.74L6 6L10.91 7.26L12 2Z"
        fill="currentColor"
      />
    </svg>
  );
}

// VS Code file type icons as simple colored text indicators
export function getFileIcon(filename) {
  const ext = filename.split('.').pop();
  const iconMap = {
    'md': { color: '#519ABA', letter: 'M' },
    'ts': { color: '#3178C6', letter: 'TS' },
    'tsx': { color: '#3178C6', letter: 'TX' },
    'js': { color: '#F7DF1E', letter: 'JS' },
    'json': { color: '#F7DF1E', letter: '{}' },
    'log': { color: '#8B949E', letter: 'L' },
    'sh': { color: '#3FB950', letter: '$' },
    'css': { color: '#563D7C', letter: '#' },
  };
  if (filename.endsWith('/')) return { color: '#E8AB53', letter: '📁' };
  return iconMap[ext] || { color: '#8B949E', letter: '?' };
}
