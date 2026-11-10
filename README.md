# Håndverkeren Langen

Ny nettside for Tom Langen. Lyst og moderne design, med varm oransje profilfarge, egne prosjektbilder og personlig presentasjon. Laget med HTML, CSS og JavaScript, uten runtime-avhengigheter.

## Sider

- `index.html`: forside med tjenester, presentasjon og utvalgte prosjekter
- `gulvstop.html`: gulvstøp, forskaling, trapper, murer og fundamentering
- `Bilder.html`: ni prosjekter med bildegallerier
- `omtaler.html`: egen side med alle 27 kundeomtaler, tilgjengelig fra hovedmeny og forside
- `ommegogomtaler.html`: om Tom, 27 originale kundeomtaler og avisutklipp
- `filmer.html`: ni filmer med lenker til YouTube
- `contact.html`: kontakt, telefontider, adresser og befaring

Eksisterende URL-stier er beholdt. Tekstinnholdet fra tomlangen.no er språkvasket og omstrukturert. Opprinnelig tekst og bildereferanser finnes i `source-content/original-content.json`. Bilder er lagret lokalt og komprimert. Ingen kundeomtaler, prosjekter eller erfaringstall er oppdiktet.

## Logo

`assets/logo.svg` er en forenklet vektorgjengivelse basert på den nye logoen som ble delt i samtalen. Selve originalfilen var ikke tilgjengelig i filsystemet. Bytt denne med original logo for helt eksakt typografi og geometri. Den gamle logoen er ikke brukt i sideoppsettet.

## Kjør og bygg

Node.js 18 eller nyere. Ingen pakker trenger å installeres.

```sh
npm run check
npm run build
```

Publiser innholdet i `dist/` på en statisk webserver. Sidene kan også åpnes direkte fra rotmappen. Ingen domene- eller DNS-endringer er utført.

## Kontaktskjema

Skjemaet validerer feltene og åpner brukerens e-postprogram med ferdig utfylt melding. Det sender ikke noe automatisk og lagrer ingen personopplysninger. Direkte lenker til telefon og e-post er tilgjengelige. For direkte innsending uten e-postprogram må en skjematjeneste eller backend kobles til.

## Innholdsavklaringer før domeneovergang

Den gamle siden oppga både Gressvikveien 32 og 32c. Her brukes 32c fra bunnteksten, mens Habekkveien 2 er beholdt som faktura-/postadresse. Bekreft gjerne at adressene og telefontidene fortsatt stemmer.

## Kontroll

`npm run check` kontrollerer lokale lenker, bilder, ankerlenker, sideoverskrifter og at de ni prosjektene, ni filmene og 27 kundeomtalene er med. JavaScript-syntaks kontrolleres også. Visuell nettleserkontroll var ikke tilgjengelig i byggeøkten fordi Sites-forhåndsvisningens nødvendige verktøy manglet.

Kundeomtaler i prosjektgalleriene vises uten beskjæring i egne felt. Forsiden inneholder tre ordrette utdrag fra kundevurderinger med direkte lenker til de fullstendige vurderingene. Forsidebildet er valgt av brukeren fra Hvalstad-prosjektet.
