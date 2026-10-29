# Automatische conceptmails instellen

De ontwerpstudio kan de concepttekst en preview automatisch naar `Skyart-creations@hotmail.com` versturen. De website gebruikt EmailJS; de accountwaarden staan bovenaan het script in `color-picker.html`.

## Eenmalige configuratie

1. Maak een EmailJS-account en koppel het e-mailadres waaruit de melding verzonden mag worden.
2. Maak één e-mailtemplate met:
   - **To Email:** `{{to_email}}`
   - **Subject:** `{{subject}}`
   - **Reply-To:** het adres waarop je reacties wilt ontvangen
   - **Bericht:** gebruik `{{concept_text}}`, `{{idea}}`, `{{main_color}}` en `{{brush_colors}}`.
3. Open bij de template **Attachments** en voeg een **Variable Attachment** toe met parameternaam `design_image`, bestandsnaam `sky-art-concept.jpg` en type `image/jpeg`. Als je de afbeelding ook direct in de e-mailtekst wilt tonen, gebruik dan in de HTML-template `<img src="cid:design_image" alt="Concept van de klant">`.
4. Zet in `color-picker.html` de EmailJS Public Key, Service ID en Template ID in `EMAILJS_CONFIG`. De ontvanger staat al op het websiteadres.
5. Zet de domeinbeperking in EmailJS op het gepubliceerde websitedomein.

De studio comprimeert de preview voor de bijlage. EmailJS vermeldt geen bijlagen bij het gratis plan; voor dynamische bijlagen is een plan met attachment-ondersteuning nodig. Controleer de actuele limiet in je EmailJS-account.

Totdat de waarden zijn ingevuld, blijft de bestaande deel/download-fallback actief. Na configuratie verzendt de knop de aanvraag rechtstreeks naar het websiteadres.
