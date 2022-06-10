# FULL-STACK WEBPROGRAMOZÁS BEADANDÓ - BLOG

Full-stack webprogramozás 2021-22/2 tárgy - beadandó feladat.

## Feladatleírás

### Feladat funkcionális követelményei

A blog applikáció egységes interfészt nyújt különböző témákban hozzáadott blog bejegyzésekhez.  
Az oldal tartalmához bejelentkezés nélkül is hozzá lehet férni.  
Az admin tud új blog bejegyzést létrehozni, meglévő bejegyzést módosítani illetve törölni.   
Új elem felvételekor az oldal átnavigál a listaoldalra, a lista tartalma változik.  
Régi elemek módosításakor az oldal visszanavigál a listaoldalra, a lista tartalma változik.  
Régi elemek törlésekor az oldal visszanavigál a listaoldalra, a lista tartalma változik.  
Az admin be tudja állítani a bejegyzés kategóriáját.  
Az admin felhasználónak joga van hozzászólásokat törölni.  
A felhasználók meg tudják tekinteni a blog bejegyzéseket, tudnak kategória alapján keresni.   
Bejelentkezés után a felhasználók tudják értékelni a bejegyzéseket, illetve hozzászólást írni hozzájuk.  

### Feladat nem funkcionális követelménye

A felhasználó a teljes adatbázisban kereshet vagy kiválaszthatja ennek részhalmazát.  
A rendszer biztosítja a tárolt dokumentumok megfelelő megjelenését.  
Bejelentkezést követően eltűnnek a Regisztrációs és Bejelentkezés opciók az oldalról, helyükre Üdvözlő üzenet és Kijelentkezés lehetőségek kerülnek.  
Csak regisztrált felhasználónak van lehetősége bejelentkezni.  
A bejelentkezésig nem érhetőek el a szerepkörökhöz kötött funkciók, ezen végpontok hívásakor az oldal visszanavigál a bejelentkezés oldalra.  
Általános felhasználó jogokkal nem jelennek meg az admin szerepkörhöz kötött funkciók, ezek nem hívhatók meg.  

### Szakterületi fogalomjegyzék


### Szerepkörök

- admin: jogosult a bejegyzések megtekintésére, bejegyzés felvételére, módosítására, törlésére, hozzászólás törlésére.  
- általános felhasználó: jogosult a bejegyzések megtekintésére, értékelésére, hozzászólás írására.

## Tervezés

### Felhasználói esetdiagram

<img src="https://github.com/dorinagy/blog/blob/main/public/pics/use-case.png?" width="600" />

### Felület terv

Kezdőlap:  
<img src="https://github.com/dorinagy/blog/blob/main/public/pics/home.png?" width="600" />

Blogpost:  
<img src="https://github.com/dorinagy/blog/blob/main/public/pics/blogpost.png?" width="600" />

Regisztráció:  
<img src="https://github.com/dorinagy/blog/blob/main/public/pics/register.png?" width="600" />

### Adatbázis terv

<img src="https://github.com/dorinagy/blog/blob/main/public/pics/database.png?" width="600" />

### Architektúra

#### Végpontok

<pre>
GET /blogposts - összes blogpost lekérdezés   
  params:   
  returns:   
    200: BlogPost[] - A felhasználó által elérhető postok   
   
GET /blogposts/:blogpostId - egy konkrét blogpost lekérdezése   
  params:   
    blogpostId: number - Ezt a konkrét blogpostot akarom lekérdezni   
  return:   
    200: BlogPost - A kért blogpost   
    404 - Nem létezik ez a blogpost   
   
POST /blogposts - egy új blogpost létrehozása   
  params:   
    Blogpost - A létrehozandó blogpost adatai   
  returns:   
    200: Blogpost - A létrehozott blogpost   
   
PATCH /blogposts/:id - blogpost módosítása a megadott adatokkal   
  params:   
    id: number - A módosítandó blogpost Id-ja   
    BlogPost - A módosítandó mezők és értékeik   
  returns:   
    200: BlogPost - A módosított blogpost   
    404 - Nem létezik a módosítandó blogpost   
    403 - Ezt az blogpost nem módosíthatja az aktuális felhasználó   
   
PUT /blogposts/:blogpostId - blogpost lecserélése   
  params:   
    id: number - A módosítandó blogpost Id-ja   
    Blogpost - A cél blogpost   
  returns:   
    200: Blogpost - A módosított blogpost   
    404 - Nem létezik a módosítandó blogpost   
    403 - Ezt az blogpost nem módosíthatja az aktuális felhasználó   
   
DELETE /blogposts/:blogpostId - blogpost törlése   
  params:   
    id: number - A törlendő blogpost Id-ja   
  returns:   
    200 - Sikerült törölni az blogpostot   
    404 - Nem létezik a törlendő blogpost   
    403 - Nincs jog az adott blogpost törléséhez   
       
GET /blogposts/:id/comments - blogposthoz tartozó kommentek lekérdezése   
  params:   
    id: number - A lekérdezendő üzenetek blogpostja   
  returns:   
    200: Comment[] - Az blogposthoz tartozó kommentek   
    403 - A felhasználó nem férhet hozzá ehhez az blogposthoz   
   
POST /blogposts/:is/comments - blogposthoz komment létrehozása   
  params:   
    id: number - Az blogpost id-ja, amihez az kommentet létre akarom hozni   
  returns:   
    200: Comment - A létrehozott komment   
    403 - A felhasználó nem férhet hozzá ehhez az blogposthoz   
</pre>
## Fejlesztői dokumentáció

### Fejlesztői környezet
Visueal Studio Code

### Használt technológiák

- Nest js
- Angular

### Kódszerkezet

- rest
    - migrations
    - dist
    - src
        - auth
        - categories
        - posts
        -  users
        - app.controller.ts
        - app.module.ts
        - app.service.ts
        - main.ts
    - test
    - blog.sqlite3
    - package.json
    - mikro-orm.config.json
    - tsconfig.json
  
- ui
    - proxy
    - src
      - app
        - blogpost-details
        - blogpost-editor
        - blogpost-list
        - blogpost-summary
        - core
        - landing
        - register
        - app-routing.module.ts
        - app.component.html
        - app.component.scss
        - app.component.ts
        - app.module.ts
      - assets
      - environments
      - index.html
      - main.ts
      - style.scss
      - test.ts
    - package.json
    - server.ts
    - karma.conf.json
    - tsconfig.json

## Tesztelés

Teszteléshez backenden a @nestjs/testing modul, frontenden a karma teszt keretrendszert használtam.

Egységtesztek:
 - főolal megnyitása
 - bejelentkezés
 - regisztráció

Tesztesetek:
 - Vendég módban a jogosulatlan végpontok nem elérhetőek, azok a '/login' végpontra navigálnak
 - Bejelentkezést követően csak az a menüpont jelenik meg, amilyen szerepköre a felhasználónak van.
 - Blog Post lista megjelenik user szerepkörű felhasználónak, de módosítani nem tud a tartalmán.
 - Blog Post lista megjelenik az admin szerepkörű felhasználónak, módosítani tud a tartalmán, valamint új postot is fel tud venni.
 - Regisztráció működik, alapértelmezett szerepkör a user.

## Felhasználói dokumentáció

### Program használata

Futtatáshoz ajánlott szoftver:
Google Chrome legfrissebb verziója

Az alkalmazás betöltésekor a főoldal megjelenik. Itt lehetőség van regisztrálni, vagy már regisztrált felhasználóként bejelentkezni. A bejelentkezést követően lehetőség van megnézni a posztokat, illetve kommentelni egy adott poszt alá.
