# Cos en joc · AULAIA

PWA estàtica en català per descobrir el cos humà a primària. Inclou:

- Joc de pistes i pessigolles sobre parts del cos.
- Repte dels músculs que intervenen en agafar un pot de galetes d’un armari alt.
- Circuit simplificat de la sang amb ritme cardíac ajustable.
- Joc de relacions sobre cervell i emocions.
- Creador de capes pròpies amb punts, explicacions i exportació/importació JSON.

## Obrir-la

Obre `index.html` per provar el joc. Per instal·lar-la com a PWA i disposar de funcionament sense connexió, serveix aquests fitxers des d’HTTPS, per exemple amb GitHub Pages. No cal cap compilació ni cap dependència externa.

## Publicar-la a GitHub Pages

Puja tots els fitxers d’aquesta carpeta a l’arrel de la branca `main`, inclosa la carpeta oculta `.github`. A **Settings → Pages**, tria **GitHub Actions** com a font. El fitxer `.github/workflows/pages.yml` publica automàticament el lloc estàtic en cada canvi a `main`. L’app utilitza rutes relatives i funciona sota la ruta pròpia del repositori.

## Contingut

Els dibuixos i els circuits són esquemes adaptats a primària. Consulta [Fonts i crèdits](./credits.html) per veure les referències científiques.

## Llicència

El codi i els dibuixos originals d’aquesta primera versió es poden reutilitzar i adaptar dins del projecte AULAIA. Les fonts externes citades només s’han fet servir com a referència científica.
