# Quasar App (envios)

A Quasar Framework app

## Install the dependencies
```bash
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```


### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).


docker build -t quasarenvios:1.0 .
docker-compose up -d

new Date().toISOString().substr(0, 10)



1.- regex para el login en el correo
2.- pantalla principal para las graficas
3.- Proveedores

keytool -genkey -v -keystore release-envios.keystore -alias envios -keyalg RSA -keysize 2048 -validity 20000
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore release-envios.keystore dist\cordova\android\apk\release\app-release-unsigned.apk envios
D:\sdk-tools-windows-4333796\build-tools\29.0.3\zipalign -v 4 dist\cordova\android\apk\release\app-release-unsigned.apk Envios.apk
