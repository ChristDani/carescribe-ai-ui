# CareScribe AI - UI

Interfaz web para CareScribe AI. Proyecto frontend en React + Vite con TailwindCSS, preparado para ejecutarse en desarrollo con `vite` y para desplegarse usando Docker (Nginx + Certbot en `docker-compose.yml`).

**Descripción**
- Frontend en React (Vite).
- API HTTP consumida mediante `axios` en la carpeta `src/api`.
- Configuración para servir en producción mediante `docker-compose.yml` y `nginx.conf`.

**Requisitos**
- Node.js (recomendado >=16) y npm o yarn para desarrollo local.
- Docker y Docker Compose para levantar la versión en contenedores.

**Archivos importantes**
- `src/` — código fuente React.
- `docker-compose.yml` — configuración Docker (puertos 80/443, certificados, nginx).
- `Dockerfile` — imagen para producción.
- `.env` — variables de entorno locales (editar según necesidad).

## Desarrollo (local)

1. Instalar dependencias:

```bash
npm install
```

2. Ejecutar servidor de desarrollo (Vite):

```bash
npm run dev
```

El servidor normalmente estará disponible en `http://localhost:5173` (Vite muestra la URL en la consola).

## Construcción y vista previa

```bash
npm run build
npm run preview
```

## Despliegue con Docker Compose

El repositorio incluye `docker-compose.yml` y un `Dockerfile` para crear y servir la aplicación con Nginx y Certbot.

1. (Opcional) Revisar/editar variables en `.env` y `docker-compose.yml` según dominio y correo.
2. Construir y levantar los servicios:

```bash
docker compose up --build -d
```

3. Verificar estado:

```bash
docker compose ps
docker compose logs -f
```

Nota: se añadió un límite de memoria al servicio web (`mem_limit: 400m` y `deploy.resources.limits.memory: 400M`) para restringir uso a 400MB.

## Notas adicionales
- Para desarrollo rápido puedes usar `npm run dev` (no requiere Docker).
- Si vas a usar TLS en producción con Certbot, asegúrate de tener el puerto 80 libre y las rutas de `letsencrypt` y `certbot-www` correctamente montadas (ya configuradas en el `docker-compose.yml`).

Si quieres, puedo:
- Ejecutar `docker compose config` para validar el `docker-compose.yml`.
- Hacer un commit con el `README.md` creado.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
