---
layout: "../../layouts/PostLayout.astro"
description: "Tento soupis informací jsem vytvořila během mého učení na zkoušku z tohoto předmětu. Pokud se na ni zrovna učíte, doufám, že vám nějak pomůže :)."
title: "[WIP] NSWI141 - Úvod do počítačových sítí"
tags:
- mff
- nswi141
dates:
  publish: 15-12-2025
---

# Contents

# Intro
## Požadavky
Při tvorbě Internetu se kladl důraz na několik základních požadavků.

### Kvalita služeb
Chceme samozřejmě, aby síť poskytovaná aplikacím byla nějak kvalitní. To můžeme měřit několika parametry. Mezi základní parametry sítě řadíme např.:
- **spoždění** (latency/delay) - doba, po kterou trvá doručit danou jednotku (paket, frame, ...) od odesílatele k příjemci
- **rozptyl** (jitter) - vyjadřuje rozptyl spoždění, j.n. jak pravidelně jsou data doručována nebo jak kolísá objem přijatých dat
- **ztrátovost** (loss) - vyjadřuje, jak často dochází ke ztracení dané jednotky během přenosu, ať už číslem nebo v procentech
- **šířku pásma** (bandwidth)

Je nutné zmínit, že ne všechny aplikace kladou stejné požadavky na parametry sítě. Např. u telefonních hovorů nám bude logicky vadit vysoké spoždění doručených paketů. Naopak u multimediálních aplikací, jako např. streamování videa, nám bude vadit, pokud se bude video sekat (síť bude mít vysoký rozptyl). Pochopitelně nám pak u obou může vadit šířka pásma, protože chceme dosáhnout na určitou kvalitu např. obrazu, tudíž si s nižší šířkou nevystačíme.

U kvality přenosu se také často objevuje pojem QoS (Quality of Service). Ten se váže na mechanismus garantování přijetí určitých zpráv. Obecně chceme dosáhnout jedné ze dvou věcí a ke každé existuje odlišné řešení.

Jednak můžeme chtít *garantovat vymezený tok pro určité zprávy*. Toho můžeme dosáhnout zcela jednoduchým způsobem - jednoduše vyhrádíme část pásma pro přenos těchto typů zpráv. Negativem tohoto přístupu je, pokud daná aplikace dané typy zpráv neposílá, zbytečně tím plýtváme šířku pásma.

Také můžeme chtít *garantovat rychlejší doručení určitých zpráv*. To provedeme pomocí prioritních front, kdy se pakety řadí do konkrétní fronty podle svého pořadí, a síť je pak postupně doručuje podle určených pravidel (ideálně ty nejdůležitější co nejdřív).

V obou případech se pakety označují značkou QoS. Ta určuje "prioritu"/"důležitost" daného paketu.

# Tvorba sítí
## Modelování sítí
Pro modelování sítí existuje hned několik standardů.

> [!info]
> Doporučuji si letmo pročíst [Wikipedii](https://en.wikipedia.org/wiki/OSI_model), případně i stránky jednotlivých vrstev. V žádném případě by zdejší popis jednotlivých vrstev neměl být brán jako vyčerpávající.

### OSI
Jedním z nich je právě OSI (open systems interconnection). Rozděluje jednotlivé protokoly do sedmi vrstev podle jejich hlavního využití. Dnes je již však velmi nepraktický, v praxi se používá spíše TCP/IP model. Stále se však hojně využívá k výuce sítí.

- První vrstvou je tzv. **fyzická vrstva** (physical layer). Ta se stará o fyzický přenos bitů mezi uzly. Zařadili bychom sem např. síťové čipy starající se o vysílání 2.4 GHz vln (v dnešní době i 5 GHz, někde i 6 GHz), všelijaké konektory a rozhraní.

- Druhá vrstva se nazývá **linková vrstva**. Stará se o přenos dat (tzv. framů) mezi přímo dvěma propojenými uzly. Jako hlavní adresovací mechanismus zde funguje MAC.

- Třetí vrstva se nazývá **síťová vrstva**.

- Čtvrtá vrstva se nazývá **transportní**.

- Pátá vrstva se nazývá **relační**.

- Šestá vrstva se nazývá **prezentační**.

- Sedmá vrstva se nazývá **aplikační**.

### TCP/IP

V dnešní době hojně používáný model pro popis sítí. Ve většině si bere inspiraci právě z OSI, některé vrstvy však trochu poupravuje nebo úplně vynechává. Popisuje jich celkově tři (čtyři):

- Nejnižší vrstva, která není přímo součástí TCP/IP, se často označuje jako **síťové rozhraní**. Spojuje první dvě vrstvy v OSI modelu. Stará se především o přenos jednotlivých rámců (framů) mezi dvěma přímo propojenými uzly. Zařadili bychom zde např. MAC.

- První vrstva se nazývá **síťová vrstva**. Funguje obdobně jako stejnojmenná vrstva v OSI modelu. Jejím hlavním úkolem je přenos paketů. Pokud se cílový uzel nachází na stejné sítí, předá se paket o vrstvu níž, tedy vrstvě linkové. V opačném případě se pak stará o směrování paketu k cílové sítí. Zařadili bychom sem např. protokol IPv{4,6}.

- Druhá vrstva je tzv. **transportní vrstva**. Funguje obdobně jako stejnojmenná vrstva v OSI modelu. Zařadili bychom sem např. TCP, UDP, či moderní QUIC.

- Třetí a poslední vrstva je tzv. **aplikační vrstva**. Spadají sem všechny protokoly, které nějakým způsobem zprostředkovávají interakci s uživatelem, např. POP3, STMP, HTTP, apod. Zařadili bychom sem však třeba i BGP či DNS.

Je nutné zmínit existenci několika protokolů, které slouží k řízení celého systému a které leží mimo tuto hiearchii. Jedná se především o ICMP, které zprostředkovává hlavně hlášení chyb během přenosu, a ARP, které slouží pro vyhledání MAC adresy zařízení s danou IP adresou.

![](https://media.geeksforgeeks.org/wp-content/uploads/20230417045622/OSI-vs-TCP-vs-Hybrid-2.webp)

## Adresování
### MAC
Na nejspodnější vrstvě se pro adresování síťových jednotek používají tzv. MAC (media access control) adresy. Jsou šestibytové, první tři byty určují výrobce, poslední tři konkrétní jednotku. Dříve byly tyto adresy vypáleny do síťových karet, čili byly statické a mohl se podle nich např. omezovat přístup. Dnes jsou však uložené v paměti a lze je libovolné měnit, což na druhou stranu zlepšuje bezpečnost a soukromí komunikace.

### IP

### Porty

Běžné předdefinované porty, tzv. well-known services, jsou např. následující:
- 21/TCP - FTP
- 22/TCP - SSH
- 23/TCP - Telnet
- 25/TCP - SMTP
- 53/* - DNS
- 80/* - HTTP
- 110/TCP - POP
- 143/TCP - IMAP
- 443/* - HTTPS

# Fyzická vrstva
První vrstvou OSI, která se nachází mimo protokoly rodiny TCP/IP, je fyzická vrstva. 

# Linková vrstva
PDU se v této vrstvě nazývá **frame** (rámec). Jeho přesný formát se liší podle použitého protokolu linkové vrstvy, ale obecně můžeme popsat části:
- **synchronizační pole**
- **hlavičku** - obsahuje metadata rámce, přinejmenším však MAC adresu *příjemce* a MAC adresu *odesílatele* (pořadí opačné od síťových protokolů)
- **data**
- **patičku** - nejčastěji obsahuje tzv. FCS (Frame Check Sequence), který slouží ke kontrole správnosti přijatých dat

Jelikož se tato vrstva musí starat o relativně mnoho věcí zároveň, rozděluje se její činnost do dvou podvrstev.

## Členění
### LLC
Podvrstva LLC (Logical Link Control) má na starosti multiplexing. Zodpovídá za správnou identifikaci síťových protokolů, tudíž že příjimací strana bude schopná je předat správnému softwaru na síťové vrstvě.

### MAC
Podvrstva MAC (Media Access Control) má na starosti jednak adresování síťových uzlů, tak přístup jednotlivých uzlů k fyzickému médiu po kterém přenos mezi konkrétními jednotkami probíhá.

## Řešení kolizí
Jedním z úkolů linkové vrstvy je řešení kolizí. Nejpoužívanějším mechanismem je Carrier Sense with Multiple Access (zkráceně CSMA). Zařízení, které chce přenést data, odposlouchává přenosové médium a detekuje, zda je volné. Někdy se také říká, že kontroluje *nosnou*. Takováto kontrola však negarantuje, že nedojde ke kolizím. Existují tedy různé způsoby, jak vzniklé kolize řešit.

### CSMA/CD
Jednou z nich je tzv. *Collision Detect* (zkráceně CD). Zařízení během vysílání zároveň kontroluje nosnou. Pokud dojde ke kolizi, zařízení přenos zastaví a informuje ostatní, že došlo ke kolizi. Náhodně si vybere dobu, po kterou bude čekat, a po jejím uplynutí se o přenos pokusí znova. Doba musí být náhodná, aby ke kolizi nedošlo znova. Zároveň se střední hodnota doby čekání s každým pokusem zvětšuje exponenciálně, aby nedošlo k zahlcení sítě. Tuto metodu využívá např. Ethernet.

### CSMA/CA
Další z metod prevence kolizí je tzv. *Collision Avoidance* (zkráceně CA). Využívá hvězdicové topologie sítě. V ní se každý přenos odehrává skrz nějaký centrální bod, takže o něm můžeme mluvit jako o dvou point-to-point přenosech. Vysílající zařízení tedy pošle zprávu a čeká na ACK od centrálního bodu. Pokud ho nedostane, vysílání zastaví, počká a zopakuje. Čekání funguje podobně jako u CSMA/CD, tedy doba se vybírá náhodně a roste exponenciálně s počtem pokusů.

## Ethernet
- Vyvinuta společností Xerox, dnes vlastněna IEEE (Institue of Electrical and Eletronics Engineers).
- Nejpoužívanější technologie pro lokální sítě.
- Pro kontrolu a prevenci kolizí používá CSMA/CD.

## WiFi

# Síťová vrstva
## IPv4
### Adresování
Tato verze používá 32 bity dlouhé adresy, většinou zapisované po oktetech oddělovaných tečkou. V dnešní době tzv. CIDR se na konci běžně zapisuje i délka síťového prefixu.

$$
\text{0.0.0.0/8}
$$

### Typy adres

## IPv6
### Adresování
Tato verze používá pro adresy rovnou celých 128 bitů. Zapisují se po dvou bytech v hexadecimálním formátu oddělovaných dvojtečkou. Pro kratší zápis lze jednu libovolnou sérii nulových slov vypustit. Bystřejší z vás jistě napadne, jak v tomto formátu zapíšeme čísla portů? Jednodušše adresu ohraničíme hranatými závorkami a port zapíšeme, jak jsme zvyklí (dvojtečkou a číslo portu).

$$
\begin{align}
\text{1dcf:24dd:c8ab:1c10:8cb4:0000:0000:0a40}\\
\text{1dcf:24dd:c8ab:1c10:8cb4::0a40}
\end{align}
$$

Ve výše uvedeném případě jsou IPv6 adresy shodné (sérii dvou po sobě jdoucích nulových slov jsme vypustili).

# Transportní vrstva

## TCP
Transmission Control Protocol

## UDP
User Datagram Protocol

# Aplikační vrstva
## DNS
## FTP
### 

## SMTP
### MIME
Multipurpose Internet Mail Extension (zkráceně MIME) řeší problém strukturování samotného mailového dokumentu. Navzdory jeho jménu se rozšířil a aktivně se používá i v jiných částech internetu (např. HTTP).

Každý dokument v tomto formátu se, podobně jako klasický mail, skládá z hlavičky a těla. Hlavička mj. definuje několik důležitých věcí:
- **typ dokumentu** - typy se definují pomocí řetězce ve formátu "{hlavní typ}/{podtyp}" (např.: "text/html", "image/jpeg", "audio/mp3")
- znaková sada
- způsob kódování
- původní název souboru, předpokládaný způsob doručení, ...

Jedním z nejdůležitějších mechanismů MIME je strukturování obsahu dokumentu. Pokud specifikujeme typ dokumentu jako **multipart**, můžeme do jeho těla vložit několik dalších dokumentů. Tímto způsobem se např. přikládají přílohy.

### Enkódování dat
#### UUENCODE
#### Base64
Toto kódování používá obdobné pravidla jako [UUENCODE](#UUENCODE), oproti němu však používá jinou tabulku znaků. Používá se jako standardní metoda pro kódování znaků v MIME.

#### Quoted-Printable
Používá se převážně pro kódování textových souborů, které se skládají převážně z ASCII znaků. Kódování probíhá tak, že se každý non-ASCII znak převede na sekvenci =HH, kde HH je hexadecimální hodnota znaku. Oproti Base64 zůstává text alespoň trochu čitelný. Pokud bychom však kódovali text, který se skládá převážně non-ASCII znaků, bude mít zakódovaný text o 300% větší velikost než původní text.

## POP3
## IMAP
## HTTP
## Telnet
## SSH
## VoIP
### H.323
### SIP
## NFS
## NTP
## DHCP
### BOOTP

# Prezentační a relační vrstva
## ASN.1

# Dodatečné informace
## Zpracované otázky
- [Sada zpracovaných otázek](https://github.com/petrroll/mff-stuff/blob/master/site/site_2024.md) se ~150 otázky
- [Moje sada :)](/notes/nswi141/questions)

## Tabulka stavových kódů
|Kód|FTP|SMTP|HTTP|
|---|---|----|----|
|1xx|Předběžná kladná odpověď (positive preliminary reply) - klient má očekávat dodatečné informace od serveru|?|Informační odpověď|
|2xx|
|3xx|
|4xx|
|5xx|

## Seznam zkratek
Níže naleznete seznam používaných zkratek. Přišlo mi, že s jejich nepřeberným množstvím skrz celý syllabus je pěkné je mít někde pohromadě :).

- **CSMA**
  - *[Carrier Sense with Multiple Access](#řešení-kolizí)*
- **FCS**
  - *[Frame Check Sequence](#linková-vrstva)*
- **FTP**
  - *[File Transfer Protocol](#ftp)*
- **MAC**
  - *[Media Access Control](#mac)* - podvrstva linkové vrstvy, starající se o adresování a přístupu k fyzickému médiu
- **LLC**
  - *[Logical Link Control](#llc)* - podvrstva linkové vrstvy, starající se převážně o multiplexing
- **PDU**
  - *Protocol Data Unit* - obecný termín popisující jednotku dat v nějaké vrstvě
- **STP**
  - *Shielded Twisted Pair* - typ kabeláže, používaného např. v Ethernetu
  - *Spanning Tree Protocol* - protokol, který využívá algoritmus pro hledání nejmenších koster pro automatickou konfiguraci switchů na jedné síti 
- **TCP**
  - *[Transmission Control Protocol](#tcp)*
- **UDP**
  - *[User Datagram Protocol](#udp)*
