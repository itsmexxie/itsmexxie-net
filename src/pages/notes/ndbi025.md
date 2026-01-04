---
layout: "../../layouts/PostLayout.astro"
description: ""
title: "[WIP] NDBI025 - Databázové systémy"
tags:
- mff
- ndmi025
dates:
  publish: 03-01-2026
---

# Contents

# Intro
Předmět je ukončen zápočtem a zkouškou. Oba se získají pomocí písemných testů. Zápočtový písemný test se skládá z první části sylabu (ER, UML, SQL), zkouška pak z druhé části (relační algebra, funkční závislosti, transakce, ...)

# Relační algebra
# Funkční závislosti

## Normálové formy
### První normálová forma (1NF)
*[Více zde.](https://en.wikipedia.org/wiki/First_normal_form)*

Udává, že relace je skutečně dvourozměrná tabulka. Každý atribut tedy musí obsahovat nějakou skalární hodnotu, nemůže obsahovat např. seznam. Jinak řečeno, tabulka je v první normálové formě, pokud množina povolených hodnot pro žádný její atribut neobsahuje další relace.

Pokud nějaká relace skutečně potřebuje pro nějaký její atribut uložit seznam relací (např. projekty zaměstnance), 1NF udává, že je nutné tuto relaci oddělit do separátní tabulky (tabulka projektů) a záznamy propojit pomocí cizích klíčů (foreign keys).

### Druhá normálová forma (2NF)
*[Více zde.](https://en.wikipedia.org/wiki/Second_normal_form)*

Udává, že se nesmí stát, aby nějaký neklíčový atribut (atribut, který se nenachází v žádném z klíčů) závisel pouze na části jakéhokoli klíče. Relace **musí** zároveň být v první normálové formě.

![Ukázka relace nesplňující druhou normálovou formu](ndbi025/2nf.png)

### Třetí normálová forma (3NF)
*[Více zde.](https://en.wikipedia.org/wiki/Third_normal_form)*

Udává, že žádný neklíčový atribut nemůže tranzitivně záviset na žádném z klíčů. Relace **musí** zároveň být v druhé normálové formě.

Alternativní definice udává, že pro každou funkční závislost takovou, že $R(A, F) : X \rightarrow a, X \subseteq A, a \in A$ platí alespoň jedna z následujících podmínek:
- $a \subseteq X$ - platí triviálně
- X je nadklíč (super-key)
- a je klíčový atribut

![Ukázka relace nesplňující třetí normálovou formu](ndbi025/3nf.png)

### Boyce-Codd normálová forma

Stejná, jako 3NF, akorát bez poslední podmínky. Zbylých dvou se nejde zbavit (první platí triviálně, druhá plyne z definice klíče).

![Ukázka relace nesplňující Boyce-Codd normálovou formu](ndbi025/bcnf.png)

# Transakce
## Uspořádatelnost
## Protokoly
Tento kurz se zaměřuje především na zamykací protokoly, které pro svoji funkci využívají tzv. [zámky](#zámky).

### Zámky
Stejně jako v ostatních paralelních systémech se i zde uplatňuje princip zámků. Konkrétní zámek vždycky patří nějaké transakci a odkazuje na nějaký objekt (relaci, prvek relace, ...).

Obecně se rozlišují dva typy - **sdílené** (read) zámky a **exkluzivní** (write) zámky. Jak již jejich názvy napovídají, sdílené zámky poskytují dané transakci přístup ke čtení daného objektu. V jeden moment může více transakcí vlastnit sdílený zámek na konkrétní objekt. Exkluzivní zámky pak poskytují přístup k přepsání/aktualizaci daného objektu. V jeden moment může vlastnit exkluzivní zámek na konkrétní objekt maximálně jedna transakce, přitom žádná jiná na něj nemůže vlastnit sdílený zámek. 

Exkluzivní zámky tak zajišťují, že nám žádná jiná transakce nepřepíše námi přepsaná data, a že zároveň žádné jiné transakci neničíme nějaký interní stav. Klasické zámky naopak zajišťují, že nám žádná jiná transakce nepřepíše objekt a nezničí interní stav.

||Sdílené|Exkluzivní|
|--|--|--|
|Čtení|✅|✅|
|Psaní|❌|✅|
|Více zámků|pouze sdílené|❌|

### Two-phase locking (2PL)
Databázové systémy pak v komunikaci s klienty implementují požadavek na uzamykání objektů, se kterými bude daný klient interagovat. Ve volné implementaci je však těžké zaručit, aby požadavek klient skutečně dodržel. Kvůli tomu se implementuje systém, ve kterém v okamžiku, kdy klient odemkne svůj první zámek, mu databáze už žádný další zámek nevydá. Díky tomu se transakce rozdělí na dvě fáze: uzamykací a odemykací (odtud název *two-phase locking*).

Existují i striktní implementace, ve které databáze klientovi nepovolí odemykat jakékoliv zámky a všechny zámky, které si klient vyžádal, se odemknou až při ukončení transakce (ať už pozitivním, či negativním). Této implementaci se říká strict 2PL (S2PL).


