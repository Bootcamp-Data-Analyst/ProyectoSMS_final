# ProyectoSMS_final
Proyecto empresa SMS
# Resumen del Proyecto: SMS DataVault

Este documento resume los requisitos y especificaciones para el desarrollo de la aplicación web **SMS DataVault**, solicitada por la empresa **SMS S.L.**.

## 1. Objetivo del Proyecto
Desarrollar una plataforma web práctica, simple y segura que permita a **SMS** gestionar bases de datos de mensajería (SMS) mediante la subida de archivos CSV y Excel, consulta filtrada y visualización de métricas.

## 2. Alcance Funcional (MVP)
El Producto Mínimo Viable debe incluir los siguientes módulos:

***Acceso y Seguridad:**
    * Sistema de login con roles de administrador y usuario estándar.
    * Autenticación en dos pasos (2FA/TOTP tipo Google Authenticator) obligatoria.
    * Control de acceso por IP (allowlist).
    * Registro de intentos de acceso, éxitos y bloqueos.
***Gestión de Datos:**
    * Subida de ficheros en formato CSV y Excel (XLS/XLSX).
    * Validación automática de tipos de datos, columnas y formato de fechas.
    * Historial de cargas con detalles de usuario, fecha y errores.
***Consultas y Filtros:**
    * Búsqueda segmentada por País, Sender (remitente) y Categoría.
    * **Restricción Crítica:** El contenido del mensaje nunca debe mostrarse en la interfaz, usándose solo para análisis interno.
***Dashboard de Métricas:**
    * Visualización de envíos por periodos (7 días, 1 mes, etc.), país y categoría.
***Categorización Automática:**
    * Clasificación de registros mediante reglas configurables al momento de la importación.

## 3. Requisitos de Ciberseguridad
La seguridad es un componente obligatorio y transversal del producto:
***Protección de Datos:** Minimización de datos almacenados, control de acceso por roles y trazabilidad de acciones.
***Cifrado:** Uso de HTTPS/TLS para datos en tránsito y preparación para cifrado en reposo.
***Hardening:** Protección contra inyección SQL, XSS, CSRF y Rate limiting en el login.

## 4. Especificaciones Técnicas Recomendadas
***Base de Datos:** PostgreSQL.
***Backend:** Python (FastAPI/Django) o Node.js.
***Contenedores:** Uso de Docker y Docker Compose para asegurar que sea reproducible localmente.
***Despliegue:** Preparación de un entorno online temprano con configuración de Firewall, allowlist de IP y backups.

## 5. Entregables Finales
1. Repositorio de código con historial de commits claros.
2. Webapp online desplegada con HTTPS y accesos controlados.
3. Documentación técnica: Modelo de datos, manual de despliegue paso a paso y decisiones técnicas.
4. Checklist de seguridad aplicado.
