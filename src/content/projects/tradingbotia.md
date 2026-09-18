---
title: TradingBotIA
tagline: KAIROS · análisis y paper trading de criptoactivos
summary: >-
  Plataforma en beta temprana para analizar múltiples mercados spot de criptoactivos,
  investigar estrategias, ejecutar backtesting y realizar paper trading con capital simulado.
cover:
  src: /images/projects/tradingbotia-cover.webp
  alt: TradingBotIA y consola KAIROS — beta de análisis y paper trading con fondos simulados
  width: 1600
  height: 900
status: desarrollo
statusLabel: Beta temprana · fondos simulados
featured: true
order: 4
showCardDetails: false
problem: >-
  La investigación de estrategias suele quedar fragmentada entre scripts, hojas de cálculo
  y terminales de mercado, dificultando el análisis, la simulación, el control de riesgo
  y la auditoría de decisiones.
solution: >-
  TradingBotIA integra estos procesos en KAIROS, una consola web que utiliza datos reales
  de varios pares spot cripto y permite analizar mercados, probar estrategias y simular
  operaciones sin utilizar dinero real ni enviar órdenes a un exchange.
architecture: >-
  Consola web KAIROS conectada a servicios de análisis, investigación, simulación y gestión
  de riesgo. Consume datos spot cripto en modo de solo lectura y registra las decisiones
  y operaciones simuladas para su supervisión y auditoría.
technologies:
  - Python
  - FastAPI
  - MySQL
  - SQLAlchemy
  - Jinja2
  - HTMX
  - HTML
  - CSS
features: []
verifiedFeatures:
  - Consola KAIROS de análisis y supervisión
  - Datos reales de múltiples pares spot cripto en modo de solo lectura
  - Indicadores técnicos y clasificación de régimen mediante reglas
  - Investigación, backtesting por lotes y validación walk-forward
  - Paper trading persistente con capital, comisiones y deslizamiento simulados
  - Controles de exposición, pérdida diaria y modo seguro
  - Ciclo automático de operaciones simuladas
  - Registro y auditoría de decisiones
  - Interfaz de escritorio y adaptación móvil preliminar
plannedFeatures:
  - Maduración de la experiencia móvil
  - Salvaguardas adicionales para una eventual ejecución real
  - Despliegue remoto estable
responsibility:
  - Arquitectura y desarrollo integral de TradingBotIA
  - Diseño de la consola KAIROS
  - Implementación del ciclo de investigación, backtesting y paper trading
  - Diseño de controles de riesgo y auditoría
  - Adaptación responsive, pruebas, seguridad y documentación
results: []
repoUrl: https://github.com/didier15774/TradingBotIA-showcase
repoLabel: Ver presentación en GitHub
images:
  - src: /images/projects/tradingbotia-desktop.webp
    alt: Consola KAIROS en escritorio con capital y operaciones simuladas
    width: 1660
    height: 1080
  - src: /images/projects/tradingbotia-mobile.webp
    alt: Consola KAIROS en teléfono con navegación responsive preliminar
    width: 499
    height: 1080
---
