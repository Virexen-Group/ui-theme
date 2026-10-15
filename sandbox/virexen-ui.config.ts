import { defineVirexenUI } from '../src/config/virexen-ui';
export default defineVirexenUI({
  app: { id: 'sandbox', name: 'CampPulze' },
  theme: { preset: 'bold', appearance: 'system', allowUserSwitch: true },
  identity: { layout: 'centered', logoPosition: 'outside-card', showTerms: true, showCopyright: true, cardMaxWidth: 420 },
  localization: { defaultLanguage: 'en-GB', defaultCountry: 'GB', defaultCurrency: 'GBP', defaultTimezone: 'Europe/London' }
});
