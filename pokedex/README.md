W projekcie do komunikacji z backendem użyto klucza "name", jako identyfikatora zamiast defaultowej dla json serwera klucza "id". Dla prawidłowego działania aplikacji komenda uruchamiająca dla json serwera jest nastepująca:

json-server db.json --id name
