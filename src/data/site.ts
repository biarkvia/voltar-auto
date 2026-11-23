export const services = [
  { id: 'diagnostika', title: 'Diagnostika vozidla', description: 'Zjistíme, proč svítí kontrolka nebo proč se vůz chová jinak než obvykle.' },
  { id: 'olej', title: 'Výměna oleje a filtrů', description: 'Vyměníme motorový olej i filtry podle doporučení výrobce vašeho vozu.' },
  { id: 'brzdy', title: 'Brzdy a podvozek', description: 'Prověříme stav brzd, tlumičů a zavěšení kol. Potřebné opravy s vámi probereme.' },
  { id: 'pneuservis', title: 'Pneuservis', description: 'Přezujeme pneumatiky, vyvážíme kola a zkontrolujeme tlak i opotřebení vzorku.' },
  { id: 'klimatizace', title: 'Servis klimatizace', description: 'Zkontrolujeme těsnost a výkon klimatizace, doplníme chladivo a vyčistíme systém.' },
  { id: 'stk', title: 'Příprava na STK', description: 'Před technickou kontrolou projdeme důležité části vozu a upozorníme vás na závady.' }
] as const;

export type ServiceId = (typeof services)[number]['id'];

export const site = {
  name: 'VOLTAR AUTO',
  slogan: ['Váš vůz.', 'Naše starost.'],
  description: 'Poctivý autoservis v Praze. Diagnostika, údržba a opravy bez zbytečných komplikací.',
  isDemo: true,
  demoLabel: 'Ukázkový projekt - fiktivní autoservis',
  contact: { location: 'Praha, Česko', email: '', phone: '' },
  nav: [
    { label: 'Služby', href: '#sluzby' },
    { label: 'O nás', href: '#o-nas' },
    { label: 'Jak to funguje', href: '#postup' },
    { label: 'Galerie', href: '#galerie' },
    { label: 'Kontakt', href: '#kontakt' }
  ],
  services,
  promises: [
    { icon: 'message', title: 'Srozumitelná komunikace' },
    { icon: 'shield', title: 'Transparentní přístup' },
    { icon: 'wrench', title: 'Individuální péče' }
  ],
  advantages: [
    { title: 'Jasná komunikace', text: 'Vysvětlíme, co jsme zjistili a co to pro vás znamená.' },
    { title: 'Individuální přístup', text: 'Zohledníme, jak vůz používáte a co od něj potřebujete.' },
    { title: 'Pečlivě odvedená práce', text: 'Po dokončení opravy zkontrolujeme výsledek.' },
    { title: 'Férové jednání', text: 'Rozsah práce i cenu s vámi vždy domluvíme předem.' }
  ],
  steps: [
    { title: 'Kontaktujte nás', text: 'Popište nám, co váš vůz potřebuje. Pokud si nejste jistí, stačí zmínit, čeho jste si všimli.' },
    { title: 'Domluvíme postup', text: 'Probereme možnosti, rozsah práce i případné náklady. Společně vybereme termín.' },
    { title: 'Postaráme se o vůz', text: 'Provedeme dohodnutý servis. Při předání vám vysvětlíme, co jsme udělali a na co si dát pozor.' }
  ]
} as const;
