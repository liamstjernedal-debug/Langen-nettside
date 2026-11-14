# Vik Regnskap

En frittstående nettside på én side for regnskapsbyrået Vik Regnskap. Siden er laget med ren HTML, CSS og JavaScript, uten byggesteg og uten avhengigheter. Åpne `index.html` direkte, eller last opp hele mappen til et statisk webhotell.

**Konsept: «Hovedboka».** Dyp furugrønn, varmt papir og messing. Serif-titler (Fraunces), linjer som i en regnskapsprotokoll, og tjenester nummerert med ekte kontonumre fra NS 4102 (1000, 5000, 2700, 8800, 6700, 2000).

## Innhold

| Seksjon | Hva den gjør |
|---|---|
| Hero | Stor tittel, et «månedsrapport»-kort med tall som teller opp og en graf som tegnes |
| Ticker | Tjenestene glir forbi som et bånd |
| Tjenester | Seks tjenester satt opp som rader i en hovedbok |
| Bildebånd | Stemningsbilde i full bredde med sitat |
| Slik jobber vi | Fire steg |
| Frister | **Live**: regner ut neste frist (MVA, A-melding, skattemelding m.m.) og viser nedtelling |
| Pakker | Enkel / Vekst / Partner, uten priser |
| Om oss | Bilde, tekst og tre løfter |
| FAQ | Fem spørsmål som kan åpnes og lukkes |
| Kontakt | Skjema som åpner e-postprogrammet med ferdig utfylt tekst |

## Bilder

De fire bildefeltene er fylt med lokale JPG-bilder i `bilder/`: kontormiljø på forsiden, et bredt møteromsbilde, kontormiljø ved «Om oss» og kaffe i det runde detaljfeltet. Bildene følger størrelsene som var satt av i oppsettet og er komprimert for rask innlasting.

Dette er illustrasjonsbilder, ikke bilder av byråets faktiske lokaler eller ansatte. Derfor er alt-tekstene generelle. Kilder og lisens er dokumentert i `bilder/KILDER.md`. Bildene kan senere erstattes med egne fotografier under de samme filnavnene.

## Må fylles inn før publisering

Alt dette er plassholdere og merket med `TODO` i `index.html`:

- [ ] Telefonnummer (`+47 000 00 000`)
- [ ] E-postadresse (`post@vikregnskap.no`, også brukt i `script.js` for skjemaet)
- [ ] Adresse og åpningstider
- [ ] Org.nr. i footer
- [ ] Sjekk at påstandene stemmer: «svar samme virkedag», «fast månedspris», «første samtale gratis»
- [ ] Hvis byrået er autorisert regnskapsførerselskap: legg det til. Det er et sterkt tillitssignal (og et krav i markedsføringen)

## Frister

Fristene i `script.js` (`deadlinesFor`) er de vanlige for AS med alminnelig MVA-termin: A-melding den 5., MVA-terminer, aksjonærregisteroppgave 31. jan, skattemelding for AS 31. mai og årsregnskap 31. juli. Siden tar ikke hensyn til helg og helligdag, noe som står forklart under listen. Kontroller fristene mot Skatteetaten hvert år.
