1.Témaválasztás indoklása

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

2.Mire való a szoftver?

Az MDP egy olyan platform, amely parfümöket árusít minden felhasználó számára. Az
alkalmazás célja az, hogy minden felhasználó számára biztosítson egy olyan webshopot,
ahonnan szívesen vásárolnának, illetve még cél, hogy megkönnyítse a vásárlást, azon
felhasználók számára akik kifejezetten parfümöt szeretnének vásárolni, és nem kívánnak
különböző féle drogériai termékek között válogatni!
Érdemes említést tenni a szoftver funkcióról pontosabban. Az alkalmazás a következő
funkciókkal rendelkezik: Regisztráció, Bejelentkezés, Kijelentkezés, Vélemény-küldés,
Vélemény-módosítás, Vélemény Törlés, Parfümök keresése (search engine), Parfüm kosárba
helyezése, Parfüm törlése a kosárból, Felhasználói profil kezelése.

3.Frontend

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

4.Backend architektúra

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

5.Adatbázis tervezés és specifikáció

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


6.Szoftvertesztelés

Bevezetés és Tesztelési Stratégia
A dokumentáció ezen része a Maison de Parfum webes alkalmazás minőségbiztosítási folyamatait és tesztelési eredményeit foglalja össze. A rendszer egy elosztott architektúrára épül, amely egy Node.js/Express backendből (Sequelize ORM és MySQL adatbázissal) és egy Angular alapú frontend kliensből áll.
A tesztelési stratégia célja a rendszer stabilitásának, biztonságának és felhasználói élményének biztosítása volt. A fejlesztés során a „Shift Left” megközelítést alkalmaztuk, ahol a tesztelés a fejlesztéssel párhuzamosan zajlott. A tesztelések során négy fő 
módszertant alkalmaztunk:
1.	Egységtesztelés (Unit Testing): A legkisebb kódmodulok izolált vizsgálata.
2.	Integrációs tesztelés: A frontend-backend és az adatbázis kapcsolatának vizsgálata.
3.	Fehér dobozos tesztelés (White-box): A belső kódszerkezet és logika elemzése.
4.	Fekete dobozos tesztelés (Black-box): A pontos működés vizsgálata felhasználói szemszögből.
