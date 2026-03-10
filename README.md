# ProyectoSMS_final
Proyecto empresa SMS
# Resumen del Proyecto: SMS DataVault

[cite_start]Este documento resume los requisitos y especificaciones para el desarrollo de la aplicación web **SMS DataVault**, solicitada por la empresa **SMS S.L.**[cite: 1, 2, 5].

## 1. Objetivo del Proyecto
[cite_start]Desarrollar una plataforma web práctica, simple y segura que permita a **SMS** gestionar bases de datos de mensajería (SMS) mediante la subida de archivos CSV y Excel, consulta filtrada y visualización de métricas[cite: 17, 18, 19, 21].

## 2. Alcance Funcional (MVP)
[cite_start]El Producto Mínimo Viable debe incluir los siguientes módulos[cite: 158, 159]:

* **Acceso y Seguridad:**
    * [cite_start]Sistema de login con roles de administrador y usuario estándar[cite: 26, 160].
    * [cite_start]Autenticación en dos pasos (2FA/TOTP tipo Google Authenticator) obligatoria[cite: 27, 160].
    * [cite_start]Control de acceso por IP (allowlist)[cite: 28, 160].
    * [cite_start]Registro de intentos de acceso, éxitos y bloqueos[cite: 29, 164].
* **Gestión de Datos:**
    * [cite_start]Subida de ficheros en formato CSV y Excel (XLS/XLSX)[cite: 35, 161].
    * [cite_start]Validación automática de tipos de datos, columnas y formato de fechas[cite: 36, 161].
    * [cite_start]Historial de cargas con detalles de usuario, fecha y errores[cite: 38].
* **Consultas y Filtros:**
    * [cite_start]Búsqueda segmentada por País, Sender (remitente) y Categoría[cite: 42, 43, 44, 45, 162].
    * [cite_start]**Restricción Crítica:** El contenido del mensaje nunca debe mostrarse en la interfaz, usándose solo para análisis interno[cite: 46, 47, 92].
* **Dashboard de Métricas:**
    * [cite_start]Visualización de envíos por periodos (7 días, 1 mes, etc.), país y categoría[cite: 57, 58, 59, 60, 163].
* **Categorización Automática:**
    * [cite_start]Clasificación de registros mediante reglas configurables al momento de la importación[cite: 63, 71].

## 3. Requisitos de Ciberseguridad
[cite_start]La seguridad es un componente obligatorio y transversal del producto[cite: 86, 87]:
* [cite_start]**Protección de Datos:** Minimización de datos almacenados, control de acceso por roles y trazabilidad de acciones[cite: 89, 90, 91, 93].
* [cite_start]**Cifrado:** Uso de HTTPS/TLS para datos en tránsito y preparación para cifrado en reposo[cite: 95, 96, 97].
* [cite_start]**Hardening:** Protección contra inyección SQL, XSS, CSRF y Rate limiting en el login[cite: 98, 99, 100].

## 4. Especificaciones Técnicas Recomendadas
* [cite_start]**Base de Datos:** PostgreSQL[cite: 131].
* [cite_start]**Backend:** Python (FastAPI/Django) o Node.js[cite: 132].
* [cite_start]**Contenedores:** Uso de Docker y Docker Compose para asegurar que sea reproducible localmente[cite: 108, 134].
* [cite_start]**Despliegue:** Preparación de un entorno online temprano con configuración de Firewall, allowlist de IP y backups[cite: 114, 115, 122].

## 5. Entregables Finales
1.  [cite_start]Repositorio de código con historial de commits claros[cite: 139].
2.  [cite_start]Webapp online desplegada con HTTPS y accesos controlados[cite: 143, 144].
3.  [cite_start]Documentación técnica: Modelo de datos, manual de despliegue paso a paso y decisiones técnicas[cite: 140, 141, 145].
4.  [cite_start]Checklist de seguridad aplicado[cite: 146].
