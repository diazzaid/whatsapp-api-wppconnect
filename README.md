# whatsapp-api-wppconnect
rest api simple implementation library wpp-connect support multi device beta
1. git clone https://github.com/diazzaid/whatsapp-api-wppconnect.git
2. cd whatsapp-api-wppconnect
3. npm i
4. npm start / node index.js
5. scan sq
6. api send message
7. curl --location --request POST 'http://localhost:3000/send-message' \
--header 'Content-Type: application/json' \
--data-raw '{
  "number": "6281224993382",
  "message": "api testing"
}'

