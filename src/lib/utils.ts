export const BASE = import.meta.env.BASE_URL

export function img(path: string): string {
  return `${BASE}assets/images/${path}`
}

declare const gtag: (...args: unknown[]) => void

/** Rótulo da ação de conversão "Clique WhatsApp" no Google Ads. */
const WA_CONVERSION = 'AW-18210895048/SfqjCJ7RosgcEMjp0OtD'

/**
 * Registra um clique no WhatsApp: evento de engajamento (GA4) + conversão (Google Ads).
 * `label` identifica a origem do clique (hero, navbar, float, cta-band).
 */
export function trackWhatsApp(label: string): void {
  if (typeof gtag === 'undefined') return
  gtag('event', 'whatsapp_click', { event_category: 'engagement', event_label: label })
  gtag('event', 'conversion', { send_to: WA_CONVERSION, value: 1.0, currency: 'BRL' })
}
