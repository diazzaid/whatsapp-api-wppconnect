# whatsapp-api-wppconnect
penbambahan fitur spintax
whatsapp api wppconnect
support multi device beta
1. git clone https://github.com/diazzaid/whatsapp-api-wppconnect.git
2. cd whatsapp-api-wppconnect
3. npm i
4. npm start / node index.js
5. scan qr
6. api send message
7. json
8. curl --location --request POST 'http://localhost:3000/send-message' \
--header 'Content-Type: application/json' \
--data-raw '{
  "number": "62812249933xx",
  "message": "api testing json"
}'
9. urldecoded
10. curl --location --request POST 'http://localhost:3000/send-message' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'number=62812249933xx' \
--data-urlencode 'message=api testing'

#example spintax

kalimat / kata di pisah dengan tanda kurung {xyz|zyx}

11. curl --location --request POST 'http://localhost:3000/send-message' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'number=62812249933xx' \
--data-urlencode 'message={api test|test api}'

12. get status
13. http://localhost:3000/getconnectionstatus

thanks

wppconnect-team https://github.com/wppconnect-team/wppconnect
