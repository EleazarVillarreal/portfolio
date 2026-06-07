export type ProfileDetail = { label: string; value: string }

export const PROFILE_DETAILS: readonly ProfileDetail[] = [
  { label: 'ROLE', value: 'Software Developer' },
  { label: 'BASE', value: 'Austin, TX' },
  { label: 'EXP', value: '10+ Years' },
  { label: 'FOCUS', value: 'React.js · Next.js · TypeScript · Node.js' },
] as const

export const SKILLS: readonly string[] = [
  'React.js',
  'Next.js',
  'TypeScript',
  'Node.js',
  'GraphQL',
  'React Native',
  'Tailwind',
  'Material UI',
  'Storybook',
  'WCAG',
  'Design Systems',
] as const
