# whatsapp-api-wppconnect
rest api library simple implementation of wppconnect https://github.com/wppconnect-team/wppconnect/blob/master/examples/rest/index.js
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
  "number": "6281224993382",
  "message": "api testing json"
}'
9. urldecoded
10. curl --location --request POST 'http://localhost:3000/send-message' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'number=6281224993381' \
--data-urlencode 'message=api testing urldecoded'
11. get status
12. http://localhost:3000/getconnectionstatus

thanks

wppconnect-team https://github.com/wppconnect-team/wppconnect
