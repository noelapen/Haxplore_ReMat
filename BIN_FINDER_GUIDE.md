npm install leaflet react-leaflet --legacy-peer-deps
npm install -D @types/leaflet --legacy-peer-deps
npm install leaflet-routing-machine --legacy-peer-deps


mkdir backend
cd backend
npm init -y
npm install express mongoose cors dotenv
npm install mongoose dotenv
node seed.js
node server.js