/** Transport boundary for a future production integration. No network or storage in the demo. */
export async function submitInquiry(isDemo: boolean, _fields: FormData): Promise<string> {
  if (isDemo) return 'Toto je ukázkový formulář. Žádné údaje nebyly odeslány.';
  return 'Odesílání poptávek zatím není k dispozici.';
}
