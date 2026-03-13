
<p align="center">
 <img width="192" height="245" alt="image" src="https://github.com/user-attachments/assets/9e3b6ed2-c262-4da0-ba87-7068217d3209" />
</p>

<p align="center"> SZENT ISTVÁN KATOLIKUS TECHNIKUM ÉS GIMNÁZIUM </p>

 <p align="center">Albók Csaba, Varga-Ádám Róbert <br> MAISON DE PARFUM <br> SZOFTVERFEJLESZTŐ ÉS-TESZTELŐ VIZSGAREMEK <br> Sátoraljaújhely, 2026</p>




# 1.Témaválasztás indoklása

A Maison De Parfum kizárólag parfümöket árusító webshop létrehozása több szempontból is
indokolt és üzletileg megalapozott döntés lehet. A parfümök piaca egy jól körülhatárolható,
niche szegmens, amely lehetővé teszi a könnyebb pozicionálást, a célcsoport pontosabb
megszólítását és a hatékonyabb marketingstratégiák kialakítását. Egy ilyen specializált
webshop kisebb versennyel néz szembe, miközben a keresőoptimalizálás is jelentősen
egyszerűbbé válik, hiszen a kulcsszavak, termékkategóriák és tartalmak mind egy adott
témára fókuszálhatnak.

A parfümök további előnye, hogy magas árréssel és egész éves, stabil kereslettel
rendelkeznek. Ezek a termékek különösen jól fogynak ünnepi időszakokban, így kiszámítható
bevételi forrást biztosítanak. A termékkínálat egyszerűsége miatt a készletkezelés is könnyen
átlátható, hiszen a variációk leggyakrabban a kiszerelésre, a nemre és a márkára
korlátozódnak. Ez a termékjellemző erősen csökkenti a backend fejlesztés komplexitását és
szignifikánsan kevesebb hibalehetőséget eredményez.
Fejlesztői szempontból egy parfümwebshop ideális projekt: letisztult adatmodellel dolgozik,
mégis alkalmas arra, hogy bemutassa egy teljes értékű e‑kereskedelmi rendszer működését.
A CRUD műveletek, a kategóriák, az admin felület, a kosár és a rendeléslogika mind
megvalósíthatók anélkül, hogy túlzottan bonyolult termékstruktúrával kellene foglalkozni.
Emellett látványos és esztétikus frontend készíthető, mivel a parfümök vizuálisan és
érzelmileg is jól kommunikálható termékek.
Összességében a parfümwebshop egyszerre egyszerű és professzionális projektalap, amely
üzleti és fejlesztői szempontból is jól kezelhető, indokolt választás. Elég összetett ahhoz,
hogy valós rendszert modellezzen, ugyanakkor elég letisztult ahhoz, hogy a hangsúly a
fejlesztésen, ne a terméklogika bonyolultságán legyen.

A Maison De Parfum tehát több szempontból is indokolt, tökéletes niche szegmens
egyedileg kiemelkedik, megtalálható rajta olcsóbb, és drágább parfüm is, így kielégítve a
vásárlók teljes igényét. Emellett a webshop specializált termékkínálata lehetővé teszi a
könnyebb marketinget és célzott ajánlatok kialakítását, miközben a vásárlók számára egy
átlátható, letisztult és esztétikus vásárlási élményt biztosít. A különleges illatok és a márkák
széles választéka pedig hozzájárul ahhoz, hogy a Maison De Parfum hűséges és visszatérő
ügyfélkört építsen.

# 2.Mire való a szoftver?

Az MDP egy olyan platform, amely parfümöket árusít minden felhasználó számára. Az
alkalmazás célja az, hogy minden felhasználó számára biztosítson egy olyan webshopot,
ahonnan szívesen vásárolnának, illetve még cél, hogy megkönnyítse a vásárlást, azon
felhasználók számára akik kifejezetten parfümöt szeretnének vásárolni, és nem kívánnak
különböző féle drogériai termékek között válogatni!
Érdemes említést tenni a szoftver funkcióról pontosabban. Az alkalmazás a következő
funkciókkal rendelkezik: Regisztráció, Bejelentkezés, Kijelentkezés, Vélemény-küldés,
Vélemény-módosítás, Vélemény Törlés, Parfümök keresése (search engine), Parfüm kosárba
helyezése, Parfüm törlése a kosárból, Felhasználói profil kezelése.

# 3.Frontend

A Maison De Parfum webáruház felhasználói felületét a Google Angular keretrendszerének
legfrissebb, 19-es verziójával valósítottuk meg. A választás azért esett erre a technológiára,
mert az Angular egy teljes körű, nagyvállalati környezetben is bizonyított keretrendszer,
amely szigorú struktúrát, típusbiztonságot (TypeScript) és kiváló skálázhatóságot kínál.
A fejlesztés során a Single Page Application (SPA) architektúrát követtük. Ennek lényege,
hogy a szerver nem kész HTML oldalakat küld vissza minden kérésre, hanem csak egyetlen
keretet (index.html), és az alkalmazás futása során a JavaScript (Angular) dinamikusan cseréli


Albók Csaba, Varga –Ádám Róbert : Maison de parfum
a tartalmat a böngészőben. Ez drasztikusan csökkenti a hálózati forgalmat és &quot;applikáció-
szerű&quot;, villámgyors felhasználói élményt nyújt.
Fejlesztési környezet és konfiguráció
A projekt alapjait a angular.json és a package.json fájlok határozzák meg. A fejlesztés során a
következő kulcsfontosságú könyvtárakat integráltuk:
 Core Framework (@angular/core v19.0.0): A keretrendszer motorja.
 RxJS (~7.8.0): A reaktív programozás alapja, amely az aszinkron adatfolyamokat (pl.
HTTP válaszok, felhasználói inputok) kezeli.
 Angular Material (v19.2.19): A Google hivatalos UI komponenskészlete, amelyet a
modális ablakok (MatDialog), értesítések (MatSnackBar) és ikonok (MatIcon)
megjelenítésére használtunk.
 Bootstrap (v5.3.8): A reszponzív rácsrendszer (Grid System) és a kártyák (card)
formázásának alapja.

# 4.Backend architektúra

A Maison De Parfum backend rendszere modern, skálázható és széles körben támogatott
technológiákra épül. A választott stack biztosítja a gyors fejlesztést, a biztonságos
adatkezelést és a könnyű karbantarthatóságot. Az alábbiakban részletesen bemutatásra
kerülnek a felhasznált főbb technológiai komponensek.
Node.js és a Futtatókörnyezet
A szerveroldali logika futtatásához a Node.js környezetet választottuk. A Node.js egy nyílt
forráskódú, platformfüggetlen futtatókörnyezet, amely a Chrome V8 JavaScript motorjára

Albók Csaba, Varga –Ádám Róbert : Maison de parfum
épül. Kiemelkedő előnye az eseményvezérelt, aszinkron I/O modell, amely különösen
alkalmassá teszi a valós idejű alkalmazások backendjének kiszolgálására.

Express.js Keretrendszer
A HTTP kérések kezelésére, az útválasztásra (routing) és a middleware-ek (köztes szoftverek)
kezelésére az Express.js keretrendszert alkalmaztuk. Az Express a Node.js legnépszerűbb
webes keretrendszere, amely minimalista, mégis rugalmas struktúrát biztosít. A package.json
fájlunk tanúsága szerint az express verziója ^5.2.1, ami a keretrendszer legfrissebb, modern
megoldásait kínálja.
Az Express használata lehetővé teszi, hogy a REST API végpontokat logikusan, értelmesen
építsük fel. A rendszerben különválasztottuk az üzleti logikát (Controllers) és az útvonalak
definícióját (Routes), amelyet az Express Router funkciója támogat.
Adatbázis és ORM: MySQL és Sequelize
Az adatok tárolásáért egy relációs adatbázis-kezelő, a MySQL felel. A választás azért esett a
relációs modellre, mert egy webshop esetében kritikus fontosságú az adatok konzisztenciája, a
táblák közötti kapcsolatok (pl. felhasználó és kosár, termék és vélemény) szigorú kezelése.
Az adatbázis és a Node.js alkalmazás közötti kommunikációt a Sequelize ORM (Object-
Relational Mapping) könyvtár valósítja meg. A Sequelize lehetővé teszi, hogy SQL
lekérdezések kézi írása helyett JavaScript objektumokkal és metódusokkal dolgozzunk, ami
jelentősen felgyorsítja a fejlesztést és csökkenti az SQL Injection típusú támadások
kockázatát.

A projektben használt főbb adatbázis-könyvtárak:
 mysql2: A MySQL adatbázis driver, amely gyorsabb és biztonságosabb, mint az elődje.
 sequelize: Maga az ORM rendszer.
Hitelesítés és Biztonság (JWT és Bcrypt)
A biztonság kiemelt szempont volt a tervezéskor. A jelszavak tárolása sosem történik nyílt
szöveges formátumban. Erre a célra a bcrypt könyvtárat használjuk, amely &quot;salt&quot; (sózás)
mechanizmussal és többszörös hasheléssel teszi visszafejthetetlenné a jelszavakat.
A felhasználók azonosítása nem munkamenet (session) alapú, hanem JSON Web Token
(JWT) alapú. Ez a modern megközelítés (Stateless authentication) ideális Single Page
Application (SPA) frontendek kiszolgálásához. Bejelentkezéskor a szerver aláír egy tokent,
amelyet a kliens minden későbbi kérésnél elküld a fejlécben.
Adatbázis Tervezés és Adatmodellek
A rendszer alapját a jól strukturált adatbázis képezi. A Sequelize ORM segítségével
definiáltuk a modelleket, amelyek közvetlenül leképeződnek az adatbázis tábláira. Az
alábbiakban részletesen elemezzük az egyes entitásokat és azok kódját.

# 5.Adatbázis tervezés és specifikáció

A Maison De Parfum webáruház adatbázisának tervezésekor a relációs adatmodell elveit
követtük. A rendszer fizikai megvalósítása MySQL adatbázis-kezelőn alapul, amelyhez a
backend alkalmazás a Sequelize ORM (Object-Relational Mapping) rétegen keresztül
kapcsolódik.
Ez a rétegzett megközelítés biztosítja az adatok integritását, a biztonságos típuskezelést,
valamint a fejlesztés során az átlátható adatszerkezetet. A terv az ERD (Entity Relationship
Diagram) szabványai szerint készült, amely öt fő entitást és azok kapcsolatait definiálja.
Entitás-Kapcsolat Modell (ERD)

Az adatbázis vizuális terve (database.erd.json) alapján a rendszer öt táblát tartalmaz, amelyek a
3. Normálformára (3NF) lettek optimalizálva. A redundancia minimalizált (kivéve a
velemenyek táblát, ahol a felhasználónév a gyorsabb lekérdezés érdekében tárolásra kerül).

Az adatbázisban szereplő entitások:
1. felhasznalok (Users): A rendszer szereplőinek központi táblája.
2. perfumes (Products): A webshop terméktörzse.
3. velemenyek (Reviews): A termékekhez vagy szolgáltatáshoz kapcsolódó
visszajelzések.
4. kosar (Cart Header): A bevásárlókosár fejrész adatait tárolja.
5. kosar_tartalom (Cart Items): A kosárban lévő tételek kapcsolótáblája.


# 6.Szoftvertesztelés

Bevezetés és Tesztelési Stratégia
A dokumentáció ezen része a Maison de Parfum webes alkalmazás minőségbiztosítási folyamatait és tesztelési eredményeit foglalja össze. A rendszer egy elosztott architektúrára épül, amely egy Node.js/Express backendből (Sequelize ORM és MySQL adatbázissal) és egy Angular alapú frontend kliensből áll.
A tesztelési stratégia célja a rendszer stabilitásának, biztonságának és felhasználói élményének biztosítása volt. A fejlesztés során a „Shift Left” megközelítést alkalmaztuk, ahol a tesztelés a fejlesztéssel párhuzamosan zajlott. A tesztelések során négy fő 
módszertant alkalmaztunk:
1.	Egységtesztelés (Unit Testing): A legkisebb kódmodulok izolált vizsgálata.
2.	Integrációs tesztelés: A frontend-backend és az adatbázis kapcsolatának vizsgálata.
3.	Fehér dobozos tesztelés (White-box): A belső kódszerkezet és logika elemzése.
4.	Fekete dobozos tesztelés (Black-box): A pontos működés vizsgálata felhasználói szemszögből.

# 7.Rendszerkövetelmények

A Maison De Parfum egy egyszeű webshop, így a futtatásához nincsen szükség speciális helyi hardvereszközökre. 

# 8.Hardverkövetelmények

 Alapfeltételek: 
 a projekt Node.js-alapú backend-et (`express`, `sequelize`, `mysql2`) és Angular 19 alapú frontend-et tartalmaz. A backend MySQL-t használ, így a szerver memóriája és I/O teljesítménye fontos.

  Fejlesztői gép (lokális - Minimum / Ajánlott) 

Minimum
  - CPU: 2 mag (pl. i3 vagy hasonló)
  - RAM: 8 GB
  - Tároló: 256 GB SSD
  - OS: Windows 10/11 vagy Linux (WSL2 használható)
  - Megjegyzés: kényelmesen fut `ng serve` + Node szerver, de egyszerre futó böngésző, IDE memóriát eszik.

Ajánlott
  - CPU: 4 mag (i5 vagy jobb)
  - RAM: 16 GB
  - Tároló: 512 GB NVMe SSD
  - Node: LTS verzió (ajánlott Node 18+), npm/yarn
  - Előny: gyors build-ek (`ng build`) és több párhuzamos fejlesztői folyamat.

Teszt 
- CPU: 2–4 mag
- RAM: 4–8 GB
- Tároló: 50–100 GB SSD
- DB: MySQL konténer vagy dedikált db instance (20–50 GB adat induláskor)

Éles üzem (kisebb forgalom - pl. hobby / prototípus) 
 Minimum
  - CPU: 2 vCPU
  - RAM: 4 GB
  - Tároló: 50 GB SSD (adattároláshoz külön kötet: 20–50 GB)
  - Hálózat: 1 Gbps hálózat javasolt
  - További: Nginx reverse proxy, process manager (PM2 / systemd)
Ajánlott
  - CPU: 4 vCPU
  - RAM: 8–16 GB
  - Tároló: 100+ GB NVMe SSD (sebesség miatt)
  - DB: dedikált MySQL (pl. 2 vCPU, 4–8 GB RAM) vagy felügyelt DB-szolgáltatás

 Éles üzem (közepes / növekvő forgalom) 
- Frontend + API réteg: 4–8 vCPU, 8–16 GB RAM (skálázható, load balancer)
- DB: 4 vCPU, 16 GB RAM (InnoDB buffer pool méretezés)
- Tárhely: NVMe SSD, RAID vagy felhőbeli IOPS garancia
- Javaslat: horizontális skálázás backend rétegen, DB replikáció olvasási terheléshez

 Nagy rendelkezésre állás / magas terhelés 
- Több backend node + load balancer (Nginx/HAProxy)
- Replikált MySQL (master + read replicas), automatikus mentések
- Separate cache réteg (Redis) ~ memcached opció
- Monitoring és autoscaling konfiguráció

Részletes technikai javaslatok 
- Tároló: NVMe/SSD kötelező éles környezetben I/O miatt. Logok és DB külön kötetre.
- RAM a MySQL-hez: InnoDB esetén állítsa be az nnodb_buffer_pool_size-t a memóriának megfelelően (pl. 8 GB RAM esetén ~4–6 GB).
- CPU: Node/Express CPU-bound feladatokat ritkán igényel, viszont sok egyidejű kérésnél több mag segít. 
- Swap: legyen konfigurálva, de RAM hiánya esetén teljesítményromlás.
- Biztonság / üzemeltetés: Nginx reverse proxy + TLS, logrotate, rendszeres DB backup (naponta), monitoring (Prometheus/Grafana vagy felhős megoldás).
- Build folyamat: Angular buildnél nagy memóriát igényelhet a `ng build` — ajánlott a build szerveren 8–16 GB RAM.

 Méretezési durva irányszámok (példa) 
- ~100 egyidejű felhasználó (olvasás-domináns): 2–4 vCPU, 4–8 GB RAM
- ~1000 egyidejű felhasználó: 4–8 vCPU, 8–16 GB RAM, DB skálázás (read replicas)
- Adatmennyiség növekedése esetén: külön log/backup/archív tárolás, napi mentés

Rövid teendők / javaslatok a bevezetéshez 
1. Fejlesztéshez: 16 GB RAM ajánlott (snappy dev experience).  
2. Éles prototípus: 4 vCPU, 8 GB RAM + dedikált MySQL (4 GB RAM) és NVMe SSD.  
3. Monitoring, automatizált mentés és TLS bevezetése azonnal az élesítés előtt

# 9.Szoftverkövetelmények

- Operációs rendszer
  - Minimum: Windows 10 / Ubuntu 20.04 / macOS 11
  - Ajánlott: Windows 11 / Ubuntu 22.04 LTS / macOS 12+
- Böngészők (támogatott)
  - Google Chrome (legfrissebb 2 verzió)
  - Microsoft Edge (legfrissebb 2 verzió)
  - Mozilla Firefox (legfrissebb 2 verzió)
  - Safari (macOS / iOS): legfrissebb verziók (tesztelés szükséges Angular Material komponensekhez)
- Fejlesztői eszközök / futtatókörnyezet
  - Node.js: LTS (18+ vagy 20+ ajánlott)
  - npm: 8+ vagy Yarn
  - Angular CLI: 19.x
  - TypeScript: 5.6.x
  - Git, VS Code (ajánlott)
- Adatbázis és konténerek
  - MySQL 8.x (InnoDB, utf8mb4)
  - Docker (opcionális): MySQL konténer fejlesztéshez/staginghez ajánlott
- Futtatás / üzemeltetés
  - Process manager: PM2 vagy systemd
  - Reverse proxy: Nginx (TLS termináció)
  - HTTPS (TLS) kötelező éles környezetben

# 10.Projekt elkészítése során alkalmazott fejlesztői eszközök

## Backend fejlesztéshez használt eszközök

Visual Studio Code (VSC)
A fejlesztési környezet, amely segítette a kódok megírását és kezelését.

XAMPP
Biztosította a helyi adatbáziskörnyezetet, tartalmazza az Apache szervert és a MySQL adatbáziskezelőt.

JavaScript (JS)
A szerveroldali logika megvalósításához használt fő programozási nyelv.

MySQL
Az adatok tárolására használt relációs adatbázis-kezelő rendszer.

Express.js
A Node.js alapú szerveroldali alkalmazásfejlesztéshez használt keretrendszer.

Node.js
Lehetővé teszi a JavaScript futtatását szerveroldalon.

## Frontend fejlesztéshez használt eszközök

Visual Studio Code (VSC)
A frontend fejlesztés során használt kódfejlesztő környezet.

Angular
A kliensoldali alkalmazás kialakításához használt keretrendszer.

Bootstrap 5
Reszponzív megjelenítéshez és előre elkészített komponensek használatához.

CSS
Az alkalmazás megjelenésének és stílusának kialakításához.

TypeScript
Az Angular fejlesztéséhez használt programozási nyelv.

HTML
Az alkalmazás szerkezetének kialakítására szolgáló jelölőnyelv.

Opera
A fejlesztés és tesztelés során használt böngésző.

Angular Material
Az alkalmazás felületén megjelenő ikonok és UI elemek megvalósításához.

# Teszteléshez használt eszközök

Postman
API-k tesztelésére, valamint a request és response üzenetek ellenőrzésére szolgáló eszköz.

Jasmine
Angular projektek egységtesztelésére használt tesztelési keretrendszer.

Karma
Az egységtesztek futtatásának automatizálására használt tesztfuttató eszköz.

# Dokumentáció készítéséhez használt eszközök

Microsoft Word
A fejlesztői és felhasználói dokumentáció, valamint egyéb szöveges anyagok szerkesztésére és formázására használt szövegszerkesztő.

# Csapatmunkát segítő szoftverek

GitHub
A projekt forráskódjának verziókezelésére és tárolására szolgáló platform.

Trello
A projekt tervezéséhez és a feladatok nyomon követéséhez használt projektmenedzsment eszköz.
Trello elérhetőség: https://trello.com/invite/b/68b6960f614caf75b734a01a/ATTIe41281a56bce94090904431d627d6be4C7D233A1/vizsgaremekalbokvarga
