# ProyectoSMS_final
Proyecto empresa SMS

<div align="center">
  <img src="ositos.jpg" alt="Equipo SMS DataVault" width="800">

  # SMS DataVault: Informe Técnico de Infraestructura y Despliegue
  **Proyecto:** Gestión de Activos SMS [cite: 2] | [cite_start]**Cliente:** SMS S.L. [cite: 5]
</div>
---

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


# INFORME TÉCNICO: ESTRATEGIA DE INFRAESTRUCTURA Y DESPLIEGUE
**Proyecto:** SMS DataVault  
**Cliente:** SMS S.L.  
**Estado:** Propuesta de Migración y Auditoría de Viabilidad  

---

## 1. ANÁLISIS DE LA INFRAESTRUCTURA ACTUAL

Tras auditar los requisitos de seguridad y funcionalidad detallados en el pliego de condiciones, se determina que el servicio de **Hostinger Business (Hosting Compartido)** actualmente contratado es **técnicamente inviable** para el despliegue final debido a las siguientes carencias críticas:

* **Entorno Compartido (Multi-tenancy):** Al ser una arquitectura donde los recursos se distribuyen entre múltiples usuarios, es imposible garantizar un control de acceso por IP (Allowlist) a nivel de kernel y la trazabilidad exhaustiva exigida por el proyecto.
* **Ausencia de Aislamiento (No-Containerization):** El proyecto requiere **Docker** para asegurar un entorno reproducible y aislado. Hostinger Business no ofrece soporte para contenedores ni sistemas PaaS.
* **Restricción del Stack Tecnológico:** El entorno actual está optimizado exclusivamente para PHP. Los procesos de **categorización automática** y la gestión masiva de datasets (CSV/Excel) demandan la potencia y las librerías avanzadas de **Python**.

## 2. JUSTIFICACIÓN DE LA SOLUCIÓN EN PYTHON

Dada la incompatibilidad del servidor actual, se ha priorizado el desarrollo de una WebApp robusta bajo el stack **Python (FastAPI/Django)** por las siguientes razones estratégicas:

1.  **Seguridad Transversal:** Implementación nativa de cifrado de grado industrial y autenticación **2FA (TOTP)** desde la fase inicial de desarrollo.
2.  **Procesamiento Privado de Datos:** La lógica de backend en Python permite la categorización inteligente de registros sin exponer el contenido sensible en la interfaz, cumpliendo con la política de privacidad de la empresa.
3.  **Garantía de Entregables:** El uso de Docker asegura que el producto sea **100% reproducible**, permitiendo a SMS S.L. evaluar los avances en cualquier entorno local o de staging.

---

## 3. PROPUESTA TÉCNICA: HOSTINGER KVM 1

Como solución óptima para el despliegue, se propone la migración a un **VPS (Servidor Virtual Privado)**. El plan seleccionado proporciona el aislamiento necesario para cumplir con los estándares de ciberseguridad.

### 3.1. Especificaciones del Plan Seleccionado
* **CPU:** 1 vCPU
* **RAM:** 4 GB
* **Almacenamiento:** 50 GB NVMe
* **S.O. Recomendado:** Ubuntu 22.04 LTS

### 3.2. Ventajas y Capacidades
* **Seguridad de Red:** Gestión de Firewall a nivel de SO para establecer perímetros de seguridad y Allowlist de IP real.
* **Entorno Dedicado:** Capacidad para ejecutar el stack completo (Python + PostgreSQL) con recursos garantizados.

### 3.3. Matriz de Limitaciones e Implementación Eficiente

| Desafío | Impacto Técnico | Estrategia de Mitigación |
| :--- | :--- | :--- |
| **Categorización Automática** | La carga de 1 vCPU puede generar latencia en importaciones masivas. | **Optimización de Docker:** Limitación estricta de recursos por contenedor y procesos asíncronos. |
| **Rendimiento Dashboard** | Posible demora en consultas de grandes datasets. | **Indexación Estratégica:** Definición de índices avanzados en campos de filtro (país, sender, categoría). |
| **Gestión de Memoria** | El límite de 4GB puede comprometer la concurrencia. | **Mantenimiento Automatizado:** Retención de datos y purga de logs/temporales programada. |

---

## 4. HOJA DE RUTA PARA EL DESPLIEGUE PROFESIONAL

Para garantizar una transición exitosa, se ejecutará el siguiente protocolo de puesta en marcha:

1.  **Aislamiento de Red:** Configuración del Firewall (UFW) limitando el tráfico exclusivamente a puertos 80/443 y SSH restringido.
2.  **Orquestación con Docker-Compose:** Separación lógica de la base de datos y la aplicación para facilitar copias de seguridad sin interrupción del servicio.
3.  **Cifrado E2E:** Implementación de un proxy inverso (Nginx) con certificados **SSL/TLS (Let's Encrypt)**.
4.  **Gestión de Secretos:** Uso de variables de entorno para proteger claves de cifrado y credenciales fuera del repositorio de código.

---

## 5. CONCLUSIÓN DEL ESTUDIO

La **Opción KVM 1** es una solución válida y profesional para cumplir con la entrega técnica de la WebApp bajo estándares de alta seguridad. No obstante, se advierte a **SMS S.L.** que, ante un crecimiento exponencial del volumen de datos o de usuarios concurrentes, se recomienda el escalado preventivo al siguiente nivel de recursos (KVM 2) para mantener la excelencia operativa.

## 6. CONCLUSIÓN ESTRATÉGICA Y VISIÓN DE FUTURO

El desarrollo de **SMS DataVault** ha representado un desafío técnico de alto nivel. A pesar de los obstáculos detectados en la infraestructura inicial y los ajustes en los flujos de comunicación, el equipo ha logrado consolidar una arquitectura robusta, funcional y segura.

* **Balance del Estado Actual:** Se ha priorizado la calidad del código y la seguridad del núcleo (**Core**). El resultado es un **MVP (Producto Mínimo Viable)** que supera los estándares de ciberseguridad convencionales.
* **Potencial y Solidez:** La plataforma es ahora **Auditable** (trazabilidad completa), **Segura** (protección de datos críticos) y **Evolutiva** (lista para escalar en entorno VPS).
* **Compromiso de Desarrollo:** Contamos con la visión técnica para cubrir el 100% de las necesidades del cliente. Nuestra hoja de ruta transforma este prototipo en una herramienta de nivel empresarial capaz de gestionar los activos digitales de **SMS S.L.** con total confianza.

---
