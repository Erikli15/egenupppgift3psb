const { pool } = require("./db.js");
const connection = pool.getConnection(pool);
class Product {
  id;
  productName;
  price;
  categoryName;
  description;
  imgUrl;

  constructor(id, productName, price, categoryName, description, imgUrl) {
    this.id = id;
    this.productName = productName;
    this.price = price;
    this.categoryName = categoryName;
    this.description = description;
    this.imgUrl = imgUrl;
  }
}

async function findAll() {
  if (!connection) {
    throw new Error("Database connection not established");
  }
  const [rows] = await (await connection).execute("SELECT * FROM products");
  return rows.map(
    (row) =>
      new Product(
        row.id,
        row.productName,
        row.price,
        row.categoryName,
        row.description,
        row.imgUrl
      )
  );
}
async function findByName(productName) {
  if (!connection) {
    throw new Error("Database connection not established");
  }
  const [rows] = await (
    await connection
  ).execute("SELECT * FROM products WHERE productName = ?", [productName]);

  // Skapa en ny instans av Product för varje produkt
  const products = rows.map((row) => {
    return new Product(
      row.id,
      row.productName,
      row.price,
      row.categoryName,
      row.description,
      row.imgUrl
    );
  });

  return products;
}

async function createTableIfNotExists() {
  if (!connection) {
    throw new Error("Database connection not established");
  }
  try {
    await (
      await connection
    ).query(
      "CREATE TABLE IF NOT EXISTS `Products` (        `id` int NOT NULL AUTO_INCREMENT,         `productName` varchar(200) NOT NULL,         `price` int NOT NULL,         `categoryName` varchar(200) NOT NULL,         `description` varchar(1000),        `imgUrl`varchar(500) ,         PRIMARY KEY (`id`)       ) ENGINE=InnoDB AUTO_INCREMENT=0;"
    );
  } catch (err) {
    console.log(err);
  }
}

async function seedProducts() {
  await create(
    "XSLATE L10",
    2100,
    "Ruggade Tablet PC:s",
    "XSLATE L10 är en tålig, stark och mycket användarvänlig Tablet, formgiven för att vara lätt att bära med sig. Utrustad med marknadens mest kraftfulla processorer och operativet Windows 10 Pro är XSLATE L10 redo att uppnå den fulla potentialen hos alla valda applikationer och program.",
    "src/poster/XSLATEL10.jpg"
  );
  await create(
    "FIDS Enzi",
    1900,
    "Ruggade Tablet PC:s",
    "FIDS Enzi erbjuder avancerade egenskaper och funktioner typiska för dyrare Tablets. Modellen har låg vikt och slimmad design, är klassad med MIL-STD 810 och IP65 för vatten-och damminträngning. Den kapacitiva 10.1 bildskärmen är klar och tydlig även i skarpt solljus.",
    "src/poster/FIDSEnzi.jpg"
  );
  await create(
    "ET80/ET85 2-i-1 Tablet PC",
    3400,
    "Ruggade Tablet PC:s",
    "Tunna och lätta ET80/ET85, drivna av kraften i Intels Generation 11-processors är två Windows 2-i-1 Tablet PC:s. Båda är designade för högsta produktivitet och säkerhet i många olika branscher, med högsta funktion och prestanda både när den används som Tablet och som Laptop. Datorn och tangentbordet är båda ruggade och klassade med IP65.",
    "src/poster/ET80ET852i1TabletPC.jpg"
  );
  await create(
    "Welo XR10G2",
    2900,
    "Ruggade Tablet PC:s",
    "Welo XR10G2 är en flexibel Tablet PC, klassad med IP65 och MIL-STD-810G. Processorn väljs med i5 eller i7-processorer, operativsystemen med Windows 7 eller 10 alternativt Linux. WiFi, Bluetooth och 4G ger stabil uppkoppling. Med moduler kan användaren enkelt anpassa sin Tablet.",
    "src/poster/WeloXR10G2.jpg"
  );
  await create(
    "MR14",
    1900,
    "Ruggade Tablet PC:s",
    "MR14 är utrustad med den kraftfulla 8:e generationens Intel Quad Core-processor och en imponerande högupplöst 14 tums Kapacitiv Multi Touch bildskärm. Med NVIDIA GeForce GTX 1050 grafikkort för avancerade grafiska och video-intensiva program och en aktiv penna (tillval) för detaljerat bildskärmsarbete är MR14 ledande bland mobila plattformar för även de mest krävande fältapplikationer.",
    "src/poster/MR14.jpg"
  );
  await create(
    "FIDS Yona Black",
    2000,
    "Ruggade Tablet PC:s",
    "FIDS Yona Black (en vidareutveckling av storsäljaren FIDS Yona) är en av de mest stilrena men kompakta ruggade Tablet PC:s som finns på marknaden; 20 mm tunn med en vikt på 1.2 kg. Med en 11.6 tums fullt högupplöst (1920 x1080) 10 punkters Kapacitiv Touch display med exceptionellt klar och tydlig bildåtergivning, även i direkt solljus.",
    "src/poster/FIDSYonaBlack.jpg"
  );
  await create(
    "FIDS Zelo",
    1800,
    "Ruggade Tablet PC:s",
    "FIDS Zelo är en mångsidig Tablet PC med hög kapacitet och som är kompatibel med en rad tillbehör för effektivt fältarbete (FIDS Zelo är även mycket lämplig för fordonsmontage). Högupplöst tydlig display, Night vision, kraftfull processor och operativsystemen Windows 10® eller Linux placerar FIDS Zelo i absoluta premiumsegmentet. Modellen är fläktlös och tystgående med överlägsen flexibilitet och extrem tålighet. Bildskärmen kan fås med Kapacitiv Touch eller Dual Mode med både Kapacitiv Touch och Aktiv Digitizer.",
    "src/poster/FIDSZelo.jpg"
  );
  await create(
    "Getac A140",
    1000,
    "Ruggade Tablet PC:s",
    'Getac A140 är en fullt ruggad Tablet PC (klassad enligt IP65) med en 14" display med vida betraktningsvinklar och generös arbetsyta. Bildskärmen är klar och distinkt, även i direkt solljus. Getac har hög datasäkerhet och en lång rad tillbehör som gör den redo för utmanande fältarbeten i tuffa miljöer.',
    "src/poster/GetacA140.jpg"
  );
  await create(
    "MR13",
    2300,
    "Ruggade Tablet PC:s",
    'Ruggade MR13 (testad och klassad enligt IP65) har en 13" stor, ljusstark och mycket detaljrik display. Den snabba och kraftfulla processorn är redo för prestandakrävande applikationer och expansioner. SmartCard/CAC-läsare är standard. För utökad prestanda finns kameror, streckkodsläsare, GNSS, Mobilt Bredband och Dual Pass Through som tillval.',
    "src/poster/MR13.jpg"
  );
  await create(
    "XPAD L10",
    2800,
    "Ruggade Tablet PC:s",
    "XPAD L10 är en gedigen Pad med ett fast vridstyvt handtag med integrerad streckkodsläsare. Modellen är utvecklad i ergonomisk design för att vara bekväm att hantera och att alltid prestera snabb, driftsäker databehandling överallt; såväl på kontoret som ute i fält eller monterad i fordon.",
    "src/poster/XPADL10.jpg"
  );
  await create(
    "Welo XR7A",
    1400,
    "Android",
    "Welo XR7A har låg vikt och med sitt format på under 220 mm ryms den i fickan på många arbetskläder. Med ruggningsgrad IP65 plus tillbehör som t ex fordonsdocka passar denna Mini Tablet för rörliga jobb inom t ex inspektion, lager, militär eller lantbruk.",
    "src/poster/WeloXR7A.jpg"
  );
  await create(
    "Welo R8S",
    1000,
    "Ruggade Mini Tablet PC:s",
    "Welo R8S är fullt ruggad med hög tålighet och ger dig alla möjligheter som finns i Windows 10®. Med Welo R8S har du hela världen i din hand. Eller i din ficka!",
    "src/poster/WeloXR8.jpg"
  );
  await create(
    "Welo XR10G2L",
    1300,
    "Ruggade Tablet PC:s",
    "Welo XR10G2L är mångsidig och erbjuder läsare för streckkoder, fingeravtrycksidentifiering, NFC och RFID. Modellen är ruggad (IP65) med härdat Gorilla Glass i displayen, inbyggd GPS och en 8MP-kamera med videofunktion. Väljs med Windows 10 eller Linux.",
    "src/poster/WeloXR10G2L.jpg"
  );
  await create(
    "Getac UX10 2-i-1",
    2900,
    "Ruggade Tablet PC:s",
    "Getac UX10 är en ny ruggad Tablet som snabbt blir en laptop, redo för krävande fältarbete. Urvalet av portar och anslutningar är generöst. Den kapacitiva displayen har lägen för Regn, Touch, Handske och Penna. UX10 kan väljas med Digitizer för precisionsarbete med t ex kartor eller tabeller.",
    "src/poster/GetacUX102i1.jpg"
  );
  await create(
    "Getac K120 2-i-1",
    3000,
    "Ruggade Tablet PC:s",
    "Getac K120 är en ny ruggad Tablet som med tillvalet tangentbord snabbt blir en kraftfull laptop. Den kapacitiva displayen har lägen för Regn, Touch, Handske och Penna. Getac K120 kan också väljas med Digitizer för detaljerat arbete med t ex kartor eller tabeller. Urvalet av portar, anslutningar, tillval och tillbehör är mycket brett.",
    "src/poster/GetacK1202i1.jpg"
  );
  await create(
    "Welo XR12",
    2500,
    "Ruggade Tablet PC:s",
    'Den generösa 12" skärmen är av härdat glas, ramen är förstärkt, display-ytan generös och portarna skyddade. Ruggade Welo XR12 har många tillbehör och tillval, som t ex streckkodsläsare, Clip On-keyboard, RFID-läsare och fingeravtrycksläsare. Operativet Microsoft Windows 10, Enterprise IoT eller Pro väljs av beställaren.',
    "src/poster/WeloXR12.jpg"
  );
  await create(
    "Welo XR12E",
    2100,
    "Ruggade Tablet PC:s",
    "Welo XR12E har den senaste och sömlösa multikommunikationen inklusive Wi-Fi 6, Bluetooth 5.0, 5G LTE- och NFC-läsare kan fältoperatörer uppleva snabbare dataöverföring, mindre latens och bredare täckning genom hela uppgiften. Utrustad med designen med dubbla batterier som kan bytas under värme gör att du kan njuta av en oavbruten arbetstid. denna unika design låter dig byta ett nytt batteri in medan du kör viktiga applikationer. exponering.",
    "src/poster/WeloXR12E.jpg"
  );
  await create(
    "RP70",
    1000,
    "Ruggade Mini Tablet PC:s",
    'Mångsidiga och ruggade RP70 har extremt låg vikt, marginellt högre än hos många PDA:s. Formatet gör att denna Tablet PC – med sin stora och tydliga 7" solljusdisplay – kan få plats i fickan. Enheten är driftsäker, IP65-klassad och ger dig kraften i Microsoft® Windows 10® IoT.',
    "src/poster/RP70.jpg"
  );
  await create(
    "Luna",
    1300,
    "Ruggade Mini Tablet PC:s",
    "Luna är en kompakt ruggad crossover med unik kombination av egenskaper och funktioner. Trots den kompakta designen har Luna en generös bildskärm, kraftfull processor och snabbladdning mm. Bildskärmen på 8” har hela 1000 nits ljusstyrka, kapacitiv multi-touch med fl era driftslägen och äkta digitizer med aktiv penna. Luna är mycket kraftfull och utrustad med 11:e generationens Intel® CoreTM i5-processor, 4G/LTE och GNSS samt senaste Wi-Fi 6 och Bluetooth V5.2. Med MIL-STD 810H, 461G och IP65-certifi eringar klarar Luna de fl esta miljöer. Luna är utrustad med USB-C för laddning och kommunikation.",
    "src/poster/Luna.jpg"
  );
  await create(
    "Getac T800",
    1400,
    "Ruggade Mini Tablet PC:s",
    "Getac T800 är en ruggad kompact och flexibel Tablet PC, med flera inbyggda funktioner för förbättrad produktivitet. Enheten har en skarp, klar 8.1 högupplöst bildskärm med Multi Touch och LifeSupport™ Hot-Swap-teknologi för snabba batteribyten. Getac T800 har inbyggda funktioner för kommunikation och uppkoppling och är förberedd för ytterligare expansion med snap-on adds. Getac T800 levereras med Windows 10®.",
    "src/poster/GetacT800.jpg"
  );
  await create(
    "Welo XR8",
    1200,
    "Ruggade Mini Tablet PC:s",
    "Welo XR8 är en liten, men fullt ruggad Tablet PC. Med förstärkt ram, väl skyddade portar och dämpande hörn klarar den yrkeslivets utmaningar. Skärmen är av härdat glas och Welo XR8 har en vatten- och dammtålighet klassad enligt IP67.",
    "src/poster/WeloXR8.jpg"
  );
  await create(
    "PX510",
    1000,
    "Ruggade Tablet PC:s",
    "Ruggade PX510 Tablet PC är utvecklad för användare som vill ha utrustning som presterar obehindrat i alla väder. Med en effektiv Intel® Core™ i5 vPro™-processor innanför ett IP65- och MIL-STD-810G-klassat hölje klarar PX510 de extremer, allt ifrån fukt och väderomslag till stötar, slag och skakningar som utrustningen dagligen kan utsättas för i krävande miljöer.",
    "src/poster/PX510.jpg"
  );
  await create(
    "Getac F110",
    1900,
    "Ruggade Tablet PC:s",
    "Getac F110 har olika bildskärmslägen för Regn, Touch, Handske och Penna. Datorn är också en av de Tablets som kan väljas med Digitizer för exakt precisionsarbete. Ruggade Getac F110 har en stark processor och erbjuder en mångfald av portar, anslutningar och tillval.",
    "src/poster/GetacF110.jpg"
  );
  await create(
    "MR14",
    2400,
    "Fordonsmonterat",
    "MR14 är en riktig cross-over, väl lämpad för fordonsmontage. Tablet PC:n är utrustad med den kraftfulla 8:e generationens Intel Quad Core-processor och en imponerande högupplöst 14 tums Kapacitiv Multi Touch bildskärm. Med NVIDIA GeForce GTX 1050 grafikkort för avancerade grafiska och video-intensiva program och en aktiv penna (tillval) för detaljerat bildskärmsarbete är MR14 ledande bland mobila plattformar för riktigt krävande fältapplikationer.",
    "src/poster/MR14.jpg"
  );
  await create(
    "Welo R10T",
    2100,
    "Ruggade Tablet PC:s",
    "En mångsidig och energieff ektiv Windowsbaserad Tablet PC Welo R10T är en prisvärd och allsidig IP65- klassad Tablet PC, med klar bildåtergivning även i skarpt solljus. Med modul (tillval) för läsare av streckkoder och goda uppkopplingsmöjligheter är Welo R10T enkel att anpassa efter uppgiften och ger den mobile windowsanvändaren en lätthanterlig plattform för snabb och kostnadseff ektiv insamling och behandling av data.",
    "src/poster/WeloR10T.jpg"
  );
  await create(
    "ARROW-serien",
    500,
    "GPS Precision",
    "RTK-mottagarna i serie Arrow tar emot och levererar positioner med hög noggrannhet - till i princip vilken enhet som helst=Smartphone, Tablet PC eller bärbar dator. Mottagarna är enkla att hantera genom Android, iOS och Windows och är redo för marknadens breda utbud av program och appar. Denna valfrihet är unik i branschen för mät- och kartteknik.",
    "src/poster/ARROWserien.jpg"
  );
  await create(
    "EOS Bridge™ GNSS",
    800,
    "GPS Precision",
    "EOS Bridge™ gör det möjligt att – via Bluetooth eller seriell kabelförbindelse – ansluta utrustning, som laserinstrument (t ex TruPulse) och andra sensorer eller mätdatainsamlare så att all information samlas in av EOS Bridge och därifrån skickas vidare till fältdatorn eller SmartPhonen. Detta ger en unik möjlighet när man använder sig av Esri ArcGIS fältappar och framförallt tillsammans med iPhone/iPad, vilka normalt sett inte kan anslutas till sådan utrustning.",
    "src/poster/EOSBridge™GNSS.jpg"
  );
  await create(
    "L10 IECEx/ATEX",
    1200,
    "Ruggade Tablet PC:s",
    "L10 XPAD ATEX IECEx och XSLATE ATEX IECEx är högpresterande Tablets klassade med ATEX och IECEx, utöver IP65 och MIL-STD810G. Båda modellerna har låg vikt, hög tålighet och anpassas enkelt efter användare och uppgift. Uppkopplingen snabb och sömlös med Bluetooth, Wifi och 4GLTE. Finns i Windows- och Androidversion.",
    "src/poster/L10IECExATEX.jpg"
  );
  await create(
    "Welo R10S",
    1500,
    "Ruggade Tablet PC:s",
    "Welo R10S är en IP65-klassad windowsbaserad Tablet PC, enkel att anpassa efter uppgift och användare. Displayen har en klar bildåtergivning, även i skarpt solljus. Med sina portar, anslutningar och läsare är den ett energieffektivt verktyg för snabb och kostnadseffektiv databehandling.",
    "src/poster/WeloR10S.jpg"
  );
  await create(
    "FOIF-serien",
    600,
    "GPS Precision",
    "A70 Mini och A90 från FOIF är avancerade GNSS RTK-mottagare för professionellt bruk. Båda modellerna levererar pålitlig och stabil positionering med centimeterprecision. Båda är av typen ”Smart-antenn” med enkel uppstart och hantering.",
    "src/poster/FOIFserien.jpg"
  );
  await create(
    "Garmin GLO™ 2",
    700,
    "GPS Precision",
    "Med Garmin GLO får du det bästa av två världar genom kombinationen av GPS/GLONASS-mottagare och Bluetooth®-teknik där du får en mycket noggrann positionsinformation i din PC eller Android-enhet med stöd för NMEA. Dessutom tar enheten emot gratis korrektion från SBAS (EGNOS).",
    "src/poster/GarminGLO™2.jpg"
  );
  await create(
    "Welo XR10",
    2200,
    "Ruggade Tablet PC:s",
    "Skärm med god läsbarhet, förstärkt ram, väl skyddade portar och dämpande hörn gör Welo XR10 till ett pålitligt arbetsredskap. Vatten- och dammtålighet klassad enligt IP67, lång drifttid och möjlighet att enkelt kunna byta batteri ute i fält är bara några av fördelarna!",
    "src/poster/WeloXR10.jpg"
  );
  await create(
    "RP70A",
    750,
    "Android",
    'Mångsidiga och ruggade RP70A har en extremt låg vikt och en storlek som bara är marginellt högre än hos många PDA:s. Formatet gör att denna Tablet – med sin stora och tydliga 7" solljusdisplay – kan få plats i fickan. Enheten är driftsäker och IP65-klassad och har Android 9.0 PIE® som operativsystem.',
    "src/poster/RP70A.jpg"
  );
  await create(
    "Welo X10A",
    900,
    "Android",
    'Welo X10A är en prisvärd IP65-klassad ruggad Android Tablet, stark och tålig. Bland egenskaperna märks operativsystemet Android 9.0, en 10.1" bildskärm med Kapacitiv Touch, HotSwap-batteri, teknik för säker stabil uppkoppling och en design som gör underhåll och expansioner snabba och enkla.',
    "src/poster/WeloX10A.jpg"
  );
  await create(
    "Welo XR12A",
    1000,
    "Android",
    "Welo XR12A med sin generösa display erbjuder stabil uppkoppling och tillval som läsare för NFC och streckkoder. Processorn är en Qualcomm (Octacore) 2.0GHz och operativet Android 10. Welo XR12A är ruggad enligt IP65 och MIL-STD-810G och stöder GLONASS med Beidou som tillval.",
    "src/poster/WeloXR12A.jpg"
  );
  await create(
    "L10 ATEX (XSLATE, XPAD)",
    550,
    "Android",
    "L10 XPAD ATEX IECEx och XSLATE ATEX IECEx är högpresterande Tablets klassade med ATEX och IECEx, utöver IP65 och MIL-STD810G. Båda modellerna har låg vikt, hög tålighet och anpassas enkelt efter användare och uppgift. Uppkopplingen snabb och sömlös med Bluetooth, Wifi och 4GLTE. Finns i Windows- och Androidversion.",
    "src/poster/L10ATEXXSLATEXPAD.jpg"
  );
  await create(
    "P8II",
    350,
    "PDA",
    "P8II är en ergonomiskt utformad robust Android handdator med alfanumeriskt tangentbord. Med generös Touch Display, 13 MP-kamera, Bluetooth, moduler för WiFi och GNSS och sina ruggade egenskaper (IP67) är enheten mycket lämplig för Androidanvändare på uppdrag inom GIS-GNSS, konstruktion, byggnad, teknik, skog eller servicenäring.",
    "src/poster/P8II.jpg"
  );
  await create(
    "FIDS Vidi",
    600,
    "PDA",
    "FIDS Vidi kombinerar funktionerna i en Windowsbaserad Tablet PC med mobiliteten hos en ruggad handdator. Den mångsidiga enheten – som ryms i fickan – är utrustad med kamera, streckkodsläsare, NFC och 4G/LTE WWAN. FIDS Vidi arbetar med Intelprocessor och högupplöst 5.5-tums multi-touch display som stöder Stylus.",
    "src/poster/FIDSVidi.jpg"
  );
  await create(
    "Welo XR8A",
    700,
    "Android",
    "XR8A är den androidbaserade Mini Tablet som har högst ruggningsgrad (IP67, MIL-STD-810G). Formatet är behändigt och vikten är låg. På insidan arbetar en Qualcomm 8-processor och operativsystemet är användarvänliga Android 9.0.",
    "src/poster/WelXR8A.jpg"
  );
  await create(
    "L10 Android",
    1100,
    "Android",
    "L10 Android XPAD/XBOOK/XSLATE är en serie högpresterande ruggade Tablets, testade och klassade med IP65 och MIL-STD810G. Operativsystemet är Android 8.1™ och processorn en kraftfull Qualcomm Octacore Snapdragon™. Alla har låg vikt, hög tålighet och anpassas enkelt efter användare och uppgift. Uppkopplingen snabb och sömlös med Bluetooth, Wifi och 4GLTE.",
    "src/poster/L10Android.jpg"
  );
  await create(
    "XSLATE D10",
    700,
    "Android",
    "Androidbaserade® XSLATE D10 är en ruggad Tablet PC, godkänd för säkert arbete i miljöer där gas eller damm kan göra atmosfären lättantändlig (ATEX). XSLATE har en invändig stomme av aluminiumlegering för vridstyvhet och gummidämpade hörn för hög stöttålighet. Displayen kontrolleras även med handskar och i väta.",
    "src/poster/XSLATED10.jpg"
  );
  await create(
    "Welo R10A",
    600,
    "Android",
    "Welo R10A är en IP65-klassad androidbaserad Tablet PC, enkel att anpassa efter uppgift och användare. Displayen har en klar bildåtergivning, även i skarpt solljus. Med bredd i portar, anslutningar och läsare är den ett energieffektivt verktyg för snabb och kostnadseffektiv databehandling. Finns även med Windows operativsystem.",
    "src/poster/WeloR10A.jpg"
  );
  await create(
    "Welo R8A",
    750,
    "Android",
    "Welo R8A är fullt ruggad med hög tålighet och ger dig alla möjligheter som finns i Android 11®. Med Welo R8A har du hela världen i din hand. Eller i din ficka!",
    "src/poster/WeloR8A.jpg"
  );
  await create(
    "Welo XR7A",
    1400,
    "Android",
    "Welo XR7A har låg vikt och med sitt format på under 220 mm ryms den i fickan på många arbetskläder. Med ruggningsgrad IP65 plus tillbehör som t ex fordonsdocka passar denna Mini Tablet för rörliga jobb inom t ex inspektion, lager, militär eller lantbruk.",
    "src/poster/WeloXR7A.jpg"
  );
  await create(
    "Welo R6S",
    460,
    "PDA",
    "En hög prestanda och mångsidig handhållen surfplatta i fi ckan med all kraften i Windows 10/11! Funktionaliteten hos en Windows-surfplatta, prestanda överallt hos en robust handdator - kombinera dem och du har WELO R6S. WELO R6S är en funktionsrik, robust handhållen med massor av datorkraft, en streckkodsläsare, kamera, NFC, 4G LTE plus alla funktioner och fördelar som kommer med Windows 10/11®.",
    "src/poster/WeloR6S.jpg"
  );
  await create(
    "UT600",
    600,
    "PDA",
    "Ruggade Androidbaserade UT600 har högklassig GNSS, härdad HD-display och kapacitiv Touch som kan användas i väta eller med handskar på. Med trådlös uppkoppling, operativet Android 11 och Octa Core-processor är prisvärda UT600 redo för effektiv databehandling.",
    "src/poster/UT600.jpg"
  );
  await create(
    "C66",
    500,
    "PDA",
    "Ruggade handhållna C66 har en generös skärm och är väl förberedd för utökade funktioner. HD-displayen är extremt klar och tydlig med härdat Corning Gorilla Glass™ för användning i utsatta miljöer. C66 erbjuder Google Play Store, NFC, sömlös kommunikation och GNSS som standard med streckkodsläsare som tillval.",
    "src/poster/C66.jpg"
  );
  await create(
    "Gen2wave RP1300",
    800,
    "PDA",
    'RP1300 är flaggskeppet i Gen2wave-serien. En ruggad PDA och bland de mest flexibla i vårt sortiment med en vikt på endast 250g. Lätt att bära med sig i handen eller fickan under hela arbetsdagen i fält och utrustad med ett kraftfullt batteri som klarar hela arbetsdagen utan behov av extra laddning. Den skarpa 4.3" solljusbildskärmen med touch och dess tålighet mot väta och stötar gör denna enhet till den optimala fältdatorn. Välj om du önskar Android eller Windows Embedded.',
    "src/poster/Gen2waveRP1300.jpg"
  );
  await create(
    "Gen2wave RP2000",
    600,
    "PDA",
    "RP2000 är en fullmatad Androidbaserad ruggad handdator för användare med krav på mobilitet och effektivitet. Vikten är endast 270 gram och storleken är mindre än 16 cm. PTT-knapp (Push-To-Talk) på sidan och högtalare på framsidan ger högkvalitativ mobil kommunikation, överallt. HD-displayen har härdat glas, tål väta och manövreras även med handskar.",
    "src/poster/Gen2waveRP2000.jpg"
  );
  await create(
    "C61",
    450,
    "PDA",
    "C61 erbjuder högkvalitativ datainsamling genom NFC, 13 MP-kamera och tillval som streckkodsläsare och UHF RFID. Batteridriven hållare för enhandsgrepp (pistol grip) finns som tillbehör. Allt gör handdatorn till ett bekvämt och tåligt arbetsredskap inom logistik, lagerhantering, tillverkning, återförsäljare, detaljhandel eller förvaltning.",
    "src/poster/C61.jpg"
  );
  await create(
    "FIDS PPC",
    1000,
    "All-In-One PC",
    "FIDS PPC är en 15.6 tums Panel PC med fläktlös konstruktion, klassad enligt IP65. Med Intel® Core™ i3-7100U processor och Windows 10® display med Kapacitiv Touch lämpar sig FIDS PPC väl för interaktiva applikationer inom industri, service, butik eller offentlig miljö och är en utmärkt plattform för handikappanpassning som t ex ögonstyrning med Eye Gaze.",
    "src/poster/FIDSPPC.jpg"
  );
  await create(
    "FIDS AIO 21.5",
    5300,
    "All-In-One PC",
    "Eleganta FIDS AIO 21.5 med stark 8th Gen Intel® Coffee Lake-processor och kraftfullt systemminne är en väldigt allround Panel PC. Med projicerande kapacitiv multi-touch bildskärm och distinkt HD-ljud lämpar sig FIDS AIO väl som terminal för interaktiv skyltning eller självbetjäning. Inom lärande, eller habilitering med t ex Eye Gaze är modellen en lättanvänd plattform.",
    "src/poster/FIDSAIO215.jpg"
  );
  await create(
    "AIO 24M",
    5400,
    "All-In-One PC",
    "AIO 24M med sitt bakterieavvisande ytskikt är väl lämpad för program och applikationer inom hälso- och sjukvård. Tablet PC:n erbjuder en generös 23.6 tums Kapacitiv Touchskärm och en kraftfull och energieffektiv Intel® Core™ i-processor. SmartCard-läsare och extra batteripack (3 batterier) finns som tillval. HotSwap är standard för säker drift.",
    "src/poster/AIO24M.jpg"
  );
  await create(
    "AIO 21M",
    4800,
    "All-In-One PC",
    "AIO 21M med sitt bakterieavvisande ytskikt är väl lämpad för program och applikationer inom hälso- och sjukvård. Tablet PC:n erbjuder en generös 21.5 tums Kapacitiv Touchskärm och en kraftfull och energieffektiv Intel® Core™ i-processor. SmartCard-läsare och extra batteripack (3 batterier) finns som tillval. HotSwap är standard för säker drift.",
    "src/poster/AIO21M.jpg"
  );
  await create(
    "Twinhead T8NY",
    500,
    "Tidigare Produkter",
    "T8NY är en mycket kraftfull och tålig Tablet PC för tuffa inom- och utomhusförhållanden. Den ergonomiska designen gör den smidig att arbeta med. T8NY har integrerad trådlös teknologi med bl.a. Bluetooth och WiFi. Med Pen/Touch kan Du arbeta såväl med fingrar som med elektronisk penna...",
    "src/poster/TwinheadT8NY.jpg"
  );
  await create(
    "Welo XR10A",
    900,
    "Android",
    "Androidbaserade Welo XR10A har en stark Qualcomm-processor och en ljusstark widescreen med Kapacitiv Touch. Tablet PC:n har lång driftstid, är ruggad enligt IP65 och har stöd för GPS (GLONASS) och ett batteri med lång driftstid.",
    "src/poster/WeloXR10A.jpg"
  );
  await create(
    "FIDS Zelo",
    2000,
    "Fordonsmonterat",
    "FIDS Zelo är en mångsidig Tablet PC som är mycket lämplig för fordonsmontage. Högupplöst tydlig display, Night vision, kraftfull processor och operativsystemen Windows 10® eller Linux placerar FIDS Zelo i absoluta premiumsegmentet. Modellen är fläktlös och tystgående med överlägsen flexibilitet och extrem tålighet. Bildskärmen kan fås med Kapacitiv Touch eller Dual Mode med både Kapacitiv Touch och Aktiv Digitizer.",
    "src/poster/FIDSZelo.jpg"
  );
  await create(
    "Fordonsmontage läs mer",
    700,
    "Fordonsmonterat",
    "Forest it Design tillhandahåller fordonsmontage och dockningsstationer till alla enheter som erbjuds i vårt sortiment, vare sig det handlar om Tablet PC:s, PDA:er, Androider, Laptops och Convertibles ...",
    "src/poster/Fordonsmontageläsmer.jpg"
  );
  await create(
    "FIDS Zeno",
    800,
    "Laptop & Convertibles",
    'Fullt ruggade FIDS Zeno är utvecklad för utmanande arbeten i extrema miljöer, där den kompromisslöst förenar användbarhet, funktion och prestanda. Laptopen har en generös högupplöst 14" bildskärm med touchfunktion, 8:e generationens Intel® Core™ processor, 16 timmars batteridriftstid, I/O-portar i särklass och många expansionsmöjligheter.',
    "src/poster/FIDSZeno.jpg"
  );
  await create(
    "FIDS Regi RCL",
    1000,
    "Laptop & Convertibles",
    'Eleganta semiruggade FIDS Regi är klassad med IP5X och MIL810G, redo för utomhusarbete. Den 15,6" stora Wide screen-displayen är generös, ljus, klar och tydlig. Intel® i5 CPU-processorn ger kraftfull prestanda. 4GLTE, Bluetooth 5.0 och Wi-Fi ger stabil och snabb uppkoppling.',
    "src/poster/FIDSRegiRCL.jpg"
  );
  await create(
    "Getac V110",
    1300,
    "Laptop & Convertibles",
    'Getac V110 är en ruggad Konvertibel, fullmatad med finesser. Datorn är slitstark trots att den både är lättare och tunnare än de flesta andra konvertibler på marknaden. Getac V110 är utrustad med 6:e generationens Intel™ Core i5 eller i7 processor och har en 11.6" Lumibond® 10 punkters kapacitiv bildskärm med hög läsbarhet. Kan även fås med Dual Mode med aktiv Digitizer (tillval).',
    "src/poster/GetacV110.jpg"
  );
  await create(
    "Getac X600",
    1400,
    "Laptop & Convertibles",
    "X600 kommer aldrig till kort med sin Intel 11:e generationens i5/i7/i9-processor, (upp till 8 kärnor); valfri NVIDIA® Quadro® RTX3000 diskret grafikkontroll och upp till 128 GB DDR4 RAM tillgängligt. Dess design med dubbla fläktar håller var och en av dessa datorkomponenter sval och kapabel, även under de mest intensiva uppgifterna, medan datalagring kan utökas upp till 6 TB med tre av användaren borttagbara PCIe SSD-enheter (SSD).",
    "src/poster/GetacX600.jpg"
  );
  await create(
    "Rugged Convertible Laptop, RCL",
    1200,
    "Laptop & Convertibles",
    "Forest it Rugged konvertibla bärbara datorer har integrering av konvertibla pekskärmar, Intel® 10:e generationens Core™ i-processorer och tangentbord i full storlek. Med en inbyggd smartkort/CAC-läsare samt valfria främre IR/RGB-kameror för ansiktsigenkänning ger dessa bärbara datorer avancerad identitetsverifiering för säker dataåtkomst.",
    "src/poster/RuggedConvertibleLaptopRCL.jpg"
  );
  await create(
    "Rxiry Lasermätare",
    500,
    "Mätinstrument",
    "XR-serien från Rxiry tillhör senaste generationens lasermätare. Med dessa enheter kan avstånd, höjder och vinklar mätas utan vare sig reflektor eller transponder och med hög noggrannhet. Vissa modeller kan även mäta kompassvinklar för Azimuth, ange GNSS-position, hastighet samt temperatur. Samtliga modeller är ruggade och IP65-klassade. Enkelt handhavande med enbart två tangenter. Laddbart batteri och laddare är standard. Mätresultat kan avläsas i displayen samt överföras via Bluetooth. Antal användningsområden är så gott som oändligt med vanliga användningsområden är mätning av avstånd och trädhöjder inom skogsbruk. Avstånd, stolphöjd och kabelhöjd inom kraftindustrin. GPS-offset inom mätindustrin.",
    "src/poster/RxiryLasermätare.jpg"
  );
  await create(
    "TruPulse Lasermätare",
    300,
    "Mätinstrument",
    "Laserteknologins engagemang för hög kvalitet och oöverträffad innovation har gjort det möjligt för TruPulse-serien att stå emot tidens tand. Dessa mycket sofistikerade och lättmanövrerade laseravståndsmätare som använder reflektorlös teknologi är designade för att leverera de mätningar som krävs av branschfolk. TruTargeting-teknologin är inbyggd i varje TruPulse-enhet och erbjuder användaren fyra inriktningslägen att välja mellan och visar alla datavärden direkt inom siktomfånget.",
    "src/poster/TruPulseLasermätare.jpg"
  );
  await create(
    "Inventax Digitala Dataklave",
    350,
    "Mätinstrument",
    "Inventax Digitala Dataklave är utvecklad för trådlös mätning med högsta noggrannhet. Via Bluetooth kommunicerar dataklaven med en app i användarens telefon, dator eller annan Android- eller iOS-enhet. Modellen är ergonomisk, ruggad och klassad enligt IP67.",
    "src/poster/InventaxDigitalaDataklave.jpg"
  );
  await create(
    "SR13M",
    1700,
    "Medical Tablet PC",
    "Innanför det hygieniska höljet på SR13M döljer sig en energieffektiv processor för stabil drift och patientsäker dokumentation i känsliga miljöer. Tablet PC:n har ett inbyggt stödben på baksidan för stående placering, och en rad praktiska tillbehör, som t ex tangentbordet som snabbt gör Tablet PC:n till en funktionell laptop. Certifierad enligt ANSI/AAMI ES60601-1.",
    "src/poster/SR13M.jpg"
  );
  await create(
    "SR16M",
    2000,
    "Medical Tablet PC",
    "Med bakterieavvisande ytskikt är SR16M en hygienisk plattform för medicinska program och applikationer inom hälso- och sjukvård. Den UL60601-1-klassade Tablet PC:n har 16 tums kapacitiv touchskärm, energieffektiv Intel®-processor och HotSwap för batteribyten utan driftsstopp. 4G LTE/AWS mobilt bredband och NFC/RFID- och Smart Card/CAC-läsare finns som tillval.",
    "src/poster/SR16M.jpg"
  );
  await create(
    "SR17M",
    2500,
    "Medical Tablet PC",
    "SR17M är certifierad med UL60601-1 (internationell standard för elektrisk medicinsk utrustning) och har ett hygieniskt bakterieavvisande ytterhölje, enkelt att hålla rent. tablet PC:n är utmärkt som plattform för program och applikationer, som t.ex. Eye Gaze.",
    "src/poster/SR17M.jpg"
  );
  await create(
    "AIO 21M",
    2800,
    "Medical Tablet PC",
    "AIO 21M med sitt bakterieavvisande ytskikt är väl lämpad för program och applikationer inom hälso- och sjukvård. Tablet PC:n erbjuder en generös 21.5 tums Kapacitiv Touchskärm och en kraftfull och energieffektiv Intel® Core™ i-processor. SmartCard-läsare och extra batteripack (3 batterier) finns som tillval. HotSwap är standard för säker drift.",
    "src/poster/AIO21M.jpg"
  );
  await create(
    "AIO 24M",
    2400,
    "Medical Tablet PC",
    "IO 24M med sitt bakterieavvisande ytskikt är väl lämpad för program och applikationer inom hälso- och sjukvård. Tablet PC:n erbjuder en generös 23.6 tums Kapacitiv Touchskärm och en kraftfull och energieffektiv Intel® Core™ i-processor. SmartCard-läsare och extra batteripack (3 batterier) finns som tillval. HotSwap är standard för säker drift.",
    "src/poster/AIO24M.jpg"
  );
  await create(
    "Ruggad Monitor",
    4000,
    "Fordonsmonteraty",
    "Chaser Ruggad Monitor är en tålig bildskärm för effektivt fältarbete. Monitorn är ruggad (MIL-STD-810H) och stöt- och vibrationstålig med en vattentät front. Bildskärmen är en 11.6” ljusstark 1000 nits display med 10 punkters Multi-Touch som behandlats för att minska reflexer och avtryck från fingrar.",
    "src/poster/RuggadMonitor.jpg"
  );
  await create(
    "Ergo Pro Sele",
    900,
    "Utrustning",
    "Ergo Pro Sele är en innovativ och mycket bekväm bärutrustning som erbjuder suverän ergonomisk handsfree-lösning för alla som arbetar mobilt med datorer, mätinstrument, GNSS-controller etc.",
    "src/poster/ErgoProSele.jpg"
  );
  await create(
    "Ergo Pro Kroken",
    800,
    "Utrustning",
    "Kroken är bärutrustningen för dig som värdesätter flexibilitet och att ha båda armarna fria under arbetsdagen. Denna skonsamma utrustning för din kropp är kompatibel med alla Tablet PC:s i vårt sortiment.",
    "src/poster/ErgoProKroken.jpg"
  );
  await create(
    "4-punktsele",
    200,
    "Utrustning",
    "Ergo Pro 4-punkts sele är en mycket kostnadseffektiv och bekväm bärutrusning för Tablets och fördelar tyngden effektivt och jämt över axlar och rygg. Datorn sitter i bekväm höjd och vinkel för att läsa och hantera. Eventuell inbyggd GPS får antennen i bra placering.",
    "src/poster/4punktsele.jpg"
  );
  await create(
    "Ergo Pro polstrad axelrem",
    100,
    "Utrustning",
    "Polstrad mjuk bärrem som avlastar armarna och ger fria händer vid rörliga arbeten. Ergonomisk modell med vadderat axelparti som är skonsamt för nacke och axlar.",
    "src/poster/ErgoPropolstradaxelrem.jpg"
  );
  await create(
    "Ergo Pro Flexbälte & Tillbehör",
    150,
    "Utrustning",
    "Ergo Pro Flexbälte erbjuder ett ergonomiskt och bekvämt sätt att bära med sig diverse utrustning. Den mjuka stoppning ger komfort både med tunna och tjocka kläder under. Runt bältet löper en plastskena på vilken löpare kan monteras på och på vilka sedan diverse hölster och väskor monteras. Dessa kan skjutas fram och tillbaka på bältet för bekväm position alternativt skjutas till baksidan för fri framsida. På ömse sidor om knäppningen finns en D-ring på vilka tillbehör kan monteras med t.ex. karbinhake.",
    "src/poster/ErgoProFlexbälte&Tillbehör.jpg"
  );
  await create(
    "GNSS-utrustning1200/DAG",
    1200,
    "Uthyrning",
    "Hyr din GPS/GNSS-utrustning! När du behöver kvalitativ teknik för ett tillfälligt arbete finns möjligheten att hyra utrustning. Forest it Design tillhandahåller toppmodern utrustning med högsta precision och kvalitet för den som vill skräddarsy sitt egna hyr-paket. Efter hyresperioden finns ofta möjlighet att köpa utrustningen till reducerat pris.",
    "src/poster/GNSSutrustning.jpg"
  );
  await create(
    "Lasermätare 700/DAG",
    700,
    "Uthyrning",
    "Vi har olika instrument för mätning av avstånd, höjd, lutning, riktning med mera och dessa kan användas både fristående och tillsammans med GNSS-utrustning för att enkelt och effektivt mäta in objekt på distans och med automatik placera in dessa på rätt plats på kartan.",
    "src/poster/Lasermätare.jpg"
  );
  await create(
    "FIDS AIO M19",
    1200,
    "Tidigare Produkter",
    'FIDS AIO M19 levereras med Windows 10® och/eller Android 4.4®. Med tunn design, smart tilt-stöd och inbyggt batteri får du en portabel Tablet PC i storformat. Den 19,5" stora bildskärmen med betraktningsvidvinkel har hög läsbarhet. Displayen med 10-punkters multi-touchfunktion styrs med fingrarna eller med kapacitiv penna (tillval).',
    "src/poster/FIDSAIOM19.jpg"
  );
  await create(
    "Getac MH132",
    200,
    "Tidigare Produkter",
    "MH132 är en fullt ruggad handdator. Kompakt som en mobiltelefon men kraftfull och smart som en dator. Får enkelt plats i byxfickan. Denna Smart PDA är det perfekta alternativet för fälthantering och kontaktbarhet både via telefon som e-post med det snabba mobila bredbandet med en nätverkshastighet på upp till 3,75G. Den inbyggda GPS:n navigerar dig till rätt adress...",
    "src/poster/GetacMH132.jpg"
  );
  await create(
    "Sahara Slate i440",
    1100,
    "Tidigare Produkter",
    "i440T och i440D är de absoluta toppmodellerna i serien. Kraftfulla och fullmatade med finesser och ger de Dig maximal prestanda i alla lägen. Intel Core 2 Duo teknologi och upp till 4 GB RAM ger maximal datakraft även till tunga applikationer. Stöd för Windows 7 Professional men kan nedgraderas till XP Professional samt Linux. Balans är viktigt för en bärbar dator. En obalanserad dator känns tyngre och försämrar ergonomin. Datorerna i Sahara serien har det kraftfulla batteriet infällt på baksidan för oslagbar balans...",
    "src/poster/SaharaSlatei440.jpg"
  );
  await create(
    "Sahara Netslate",
    1000,
    "Tidigare Produkter",
    "Sahara a230T och a230D är de senaste modellerna i serien. Utrustad med Intels Atom N270 processor har Netslate mycket lång batteridriftstid och ett lågt pris. Netslate kan även konfigureras med helt integrerad",
    "src/poster/SaharaNetslate.jpg"
  );
  await create(
    "Sahara NetSlate a510",
    1000,
    "Tidigare Produkter",
    "Storsäljaren Sahara NetSlate Tablet PC är nu här i andra generationen, Sahara NetSlate a510. Med det bästa från första generationen och nivån ”vassare” i allt vad gäller prestanda och mångsidighet. Designad för att öka produktiviteten och effektiviteten i er organisation till ett oslagbart pris. Optimal för volyminstallationer...",
    "src/poster/SaharaNetSlatea510.jpg"
  );
  await create(
    "Sahara Slate i412",
    900,
    "Tidigare Produkter",
    "i412T är mellanmodellen i serien och kombinerar god prestanda med fördelaktigt pris. Egenskaper som gör att Sahara i412T ofta väljs för volyminstallationer. Intel Celeron processor och upp till 4 GB RAM ger god prestanda även till tunga applikationer. Stöd för Windows 7 Professional men kan nedgraderas till XP Professional samt Linux.",
    "src/poster/SaharaSlatei412.jpg"
  );
  await create(
    "Armor X10al",
    1000,
    "Tidigare Produkter",
    "Armor X10 är den tåligaste produkten i vårt sortiment och fortsätter fungera där andra alternativ gett upp sedan länge. DuraCase™ Skalet i aluminium med ShutOut™ teknologi ger stryktålighet. Varianten med aktiv digitizer har kemiskt härdat glas ger ytterligare tålighet.",
    "src/poster/ArmorX10al.jpg"
  );
  await create(
    "XBOOK L10 2-in-1",
    3000,
    "Ruggade Tablet PC:s",
    "XBOOK L10 2-i-1 är ett mångsidigt alternativ till en 10.1 tums Laptop. Med sitt avdockningsbara fullfunktions-tangentbord presterar den lika väl vid skrivbordet som ute i fält. Användare uppskattar mångsidigheten och enkelheten i att bara behöva använda en enda dator för alla uppgifter och all databehandling – överallt.",
    "src/poster/XBOOKL102in1.jpg"
  );
  await create(
    "Trimble GeoExplorer 6000",
    350,
    "Tidigare Produkter",
    "Trimble GeoExplorer 6000 XT/XH är handdatorn som tar GNSS produktiviteten till en helt ny nivå. Handdatorn levererar decimeter precision i realtid med dubblefrekvens L1/L2 och stöd för EGNOS. GeoExplorer har en 4,2” stor solljusbildskärm med touch och trådlösa kommunikationsverktyg som bluetooth, Wifi och 3,5G WWAN vilket är en perfekt arbetspartner i fält med 10h batteritid...",
    "src/poster/TrimbleGeoExplorer6000.jpg"
  );
  await create(
    "FIDS Enzi",
    1900,
    "Ruggade Tablet PC:s",
    'FIDS Enzi erbjuder avancerade egenskaper och funktioner typiska för dyrare Tablets. Modellen har låg vikt och slimmad design, är klassad med MIL-STD 810 och IP65 för vatten-och damminträngning. Den kapacitiva 10.1" bildskärmen är klar och tydlig även i skarpt solljus.',
    "src/poster/FIDSEnzi.jpg"
  );
  await create(
    "FIDS Yona Black",
    2000,
    "Ruggade Tablet PC:s",
    "FIDS Yona Black (en vidareutveckling av storsäljaren FIDS Yona) är en av de mest stilrena men kompakta ruggade Tablet PC:s som finns på marknaden; 20 mm tunn med en vikt på 1.2 kg. Med en 11.6 tums fullt högupplöst (1920 x1080) 10 punkters Kapacitiv Touch display med exceptionellt klar och tydlig bildåtergivning, även i direkt solljus.",
    "src/poster/FIDSYonaBlack.jpg"
  );
}
async function create(productName, price, categoryName, description, imgUrl) {
  try {
    // Kontrollera om produkten redan finns i databasen
    const existingProducts = await findByName(productName);
    if (existingProducts.length > 0) {
      console.log(`Produkten "${productName}" finns redan i databasen.`);
      return { error: "Produkten finns redan" };
    }

    // Skapa en ny produkt om den inte finns
    const [result] = await (
      await connection
    ).query(
      "INSERT INTO Products(productName, price, categoryName, description, imgUrl) VALUES(?,?,?,?,?)",
      [productName, price, categoryName, description, imgUrl]
    );
    console.log("Created product with ID: " + result.insertId);
    return { success: true, productId: result.insertId };
  } catch (error) {
    console.error("Fel vid skapande av produkt:", error);
    return { error: "Fel vid skapande av produkt" };
  }
}

async function addProduct(
  productName,
  price,
  categoryName,
  description,
  imgUrl
) {
  if (!connection) {
    throw new Error("Database connection not established");
  }
  try {
    const query =
      "INSERT INTO Products(productName, price, categoryName, description, imgUrl) VALUES(?,?,?,?,?)";
    const values = [
      productName,
      price,
      categoryName,
      description,
      imgUrl === "" ? null : imgUrl,
    ];
    console.log(`Executing query: ${query} with values: ${values}`);
    await (await connection).query(query, values);
  } catch (error) {
    console.error(`Error updating product: ${error.message}`);
  }
}

async function updateProduct(
  id,
  productName,
  price,
  categoryName,
  description,
  imgUrl
) {
  try {
    if (
      !id ||
      !productName ||
      !price ||
      !categoryName ||
      !description ||
      !imgUrl
    ) {
      throw new Error("All parameters are required");
    }
    const params = [
      productName,
      price,
      categoryName,
      description,
      imgUrl,
      parseInt(id),
    ];
    const query =
      "UPDATE Products SET productName = ?, price = ?, categoryName = ?, description = ?, imgUrl = ? WHERE id = ?";
    try {
      const [result] = await pool.execute(query, params);
      console.log("Query executed successfully");
      return result;
    } catch (error) {
      console.error(`Error updating product: ${error.message}`);
      throw error;
    }
  } catch (error) {
    console.error(`Error ${error.message}`);
    throw error;
  }
}

async function deleteProduct(productId) {
  if (!connection) {
    throw new Error("Database connection not established");
  }
  await (
    await connection
  ).query("DELETE FROM Products WHERE id=?", [productId]);
}

module.exports = {
  findAll,
  findByName,
  create,
  seedProducts,
  createTableIfNotExists,
  addProduct,
  updateProduct,
  deleteProduct,
};
