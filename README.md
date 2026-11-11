# Cos en joc · AULAIA

PWA estàtica en català per descobrir el cos humà a primària. Inclou:

- Dues identitats il·lustrades al llarg de les edats: en Nil (nen i adult) i la Nia (nena, adolescent i adulta), amb vista de davant i d’esquena.
- Joc de pistes i pessigolles sobre parts del cos.
- Cinc capes principals: cos, músculs, ossos, venes i artèries, i nervis.
- Repte dels músculs que intervenen en agafar un pot de galetes d’un armari alt, amb mapa muscular sobre roba d’aula.
- Joc dels ossos que sostenen i protegeixen; recorreguts dels missatges nerviosos.
- Circuit simplificat de la sang amb ritme cardíac ajustable.
- Joc de relacions sobre cervell i emocions.
- Creador de capes pròpies amb punts, explicacions i exportació/importació JSON.

## Obrir-la

Obre `index.html` per provar el joc. Per instal·lar-la com a PWA i disposar de funcionament sense connexió, serveix aquests fitxers des d’HTTPS, per exemple amb GitHub Pages. No cal cap compilació ni cap dependència externa.

## Publicar-la a GitHub Pages

Puja tots els fitxers d’aquesta carpeta a l’arrel de la branca `main`, inclosa la carpeta oculta `.github`. A **Settings → Pages**, tria **GitHub Actions** com a font. El fitxer `.github/workflows/pages.yml` publica automàticament el lloc estàtic en cada canvi a `main`. L’app utilitza rutes relatives i funciona sota la ruta pròpia del repositori.

## Contingut

Les il·lustracions dels personatges s’han generat expressament per a aquesta app. Les figures es mostren de la mateixa mida per facilitar el joc: això no representa les alçades reals de cada edat. Les capes anatòmiques i els circuits són esquemes adaptats a primària, no làmines d’anatomia detallada. Consulta [Fonts i crèdits](./credits.html) per veure les referències científiques.

## Llicència

El codi i els materials visuals d’aquesta versió es poden reutilitzar i adaptar dins del projecte AULAIA. Les fonts externes citades només s’han fet servir com a referència científica.
