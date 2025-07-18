export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: 'E-receipt',
  description: 'Make beautiful websites regardless of your design experience.',
  navItems: [
    {
      label: 'Receipt',
      href: '/',
    },
    {
      label: 'Settlement',
      href: '/settlement',
    },
  ],
  navMenuItems: [
    {
      label: 'Receipt',
      href: '/',
    },
    {
      label: 'Settlement',
      href: '/settlement',
    },
  ],
  links: {
    github: 'https://github.com/frontio-ai/heroui',
    twitter: 'https://twitter.com/hero_ui',
    docs: 'https://heroui.com',
    discord: 'https://discord.gg/9b6yyZKmH4',
    sponsor: 'https://patreon.com/jrgarciadev',
  },
}
