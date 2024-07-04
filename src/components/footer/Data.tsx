export interface FooterItem {
  name?: string;
  icon: string;
  link: string;
  category: 'social' | 'internal';
}

export const footer_items: FooterItem[] = [
  {
    icon: "fab fa-github",
    link: "https://github.com/nascimentotnp/real_estate-front",
    category: 'social',
  }
];
