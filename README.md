# ManagerZoneCodeSnippets
Repo with combined Google Apps Script code snippets to make ManagerZone more friendly as developers failed to do so :)

## 1. Automatyczne pobieranie biletów eventowych
Logowanie się co kilka godzin po to aby kliknąć jeden przycisk? Pff, już nie. Wystarczy tylko konto Google aby bilety automatycznie pojawiały się na waszych kontach. No więc zaczynamy:
1. Wejdź na https://script.google.com/home/start i zaloguj się (przy pierwszym uruchomieniu trzeba kliknąć start scripting).
2. Utwórz nowy projekt i skopiuj zawartość pliku `EventTickets.gs` do edytora.
3. Teraz najbardziej skomplikowana część instrukcji. Aby pobrać bilet trzeba być zalogowanym, a że w żądaniu https używane jest hasło po enkrypcji, trzeba je jakoś znaleźć.

<b>UWAGA</b>: Notka dotycząca cyber bezpieczeństwa - wszystkie żądania https będą wysyłane poprzez Google Apps Script, czyli w praktyce Google będzie miało dostęp do waszych zaszyfrowanych haseł w ManagerZone. Co może złego się stać? W teorii ktoś z Google może się zalogować na wasze konto MZ i zrobić jakieś złe rzeczy, ale w praktyce... Google ma gdzieś wasze konta MZ :) Jednak jeśli dalej macie jakieś wątpliwości, nie musicie kontynuować!

No więc, najtrudniejsza część: odpalamy Chrome (inna przeglądarka też zadziała, ale interesujące nas informacje mogą być gdzie indziej zlokalizowane) wchodzimy na ekran logowania ManagerZone, klikamy prawym gdziekolwiek na stronie i wybieramy z menu opcję Inspect. Pojawi się taka wkładka dla developerów, na górze wybieramy zakładkę Network (Sieć). Wklepujemy nasze dane i logujemy się. Jak wszystko się załaduje, to w tej developerskiej nakładce podjeżdżamy na górę tabeli i szukamy nazwy `?p=login`. Klikamy w nią i wybieramy z prawej strony drugą zakładkę Payload (nie wiem jak to jest nazwane w polskiej wersji językowej) i mamy nasze dane!

![image](https://github.com/radoslawik/ManagerZoneCodeSnippets/assets/55437425/fcb6ceaf-2b01-418a-b912-e80f3da1c6da)

4. Kopiujemy nasze dane i wracamy do kodu w GoogleAppsScript, `logindata[md5]` to hasło, a `logindata[username]` to login. Login wklejamy w pierwszej linijce między apostrofy, a zaszyfrowane hasło w drugiej.
5. Zapisujemy projekt, można też zmienić jego nazwę. Może się pojawić jakieś okno z Googla, na których trzeba zezwolić łączenia się z zewnętrznymi stronami poprzez Apps Script.
6. Jeśli macie dostępne bilety do pobrania, to możemy sobie sprawdzić czy wszystko działa. Na pasku z opcjami jest przycisk Uruchom, Debugowania oraz dropdown z funkcjami do uruchomienia. Wybieramy funckję `GetEventTickets` i klikamy Uruchom. Kiedy program się skończy, bilety powinny pojawić się na waszych kontach
7. Automatyzacja. Z menu po lewej strony wybieramy opcję Reguły (ikonka budzika) i na dole klikamy Dodaj wyzwalacz. Wypełniamy tak jak poniżej i zapisujemy.

![image](https://github.com/radoslawik/ManagerZoneCodeSnippets/assets/55437425/e41a96b1-211c-4293-85af-3a62b194c6b7)

Prostymi słowami, co 15 minut (można sobie ustawić inną wartość) skrypt zostanie wykonany i jeśli w danym momencie bilety są dostępne do pobrania, to zostaną pobrane. Po zakończeniu eventu wyzwalacz można usunąć. To chyba tyle z mojej strony, jeśli natraficie na jakieś problemy albo macie jakieś pytania to dajcie znać! Ostatnia rzecz, kiedy będziecie dzielić się z kimś tą instrukcją, zadawać pytania, wrzucać screeny, pamiętajcie żeby <b>NIE</b> pokazywać waszych danych logowania. Cheers!
