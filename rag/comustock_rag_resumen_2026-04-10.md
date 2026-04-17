# ComuStock — relevamiento para RAG

## Qué incluye
- Descripción breve y robusta del sitio
- Taxonomía principal y subcategorías
- Rutas de páginas públicas del sitio
- Inventario de recursos descargables con URL productiva canónica
- Inconsistencias detectadas
- Exclusiones y pendientes para corregir
- Reglas de alcance del asistente y derivación a Loopi

## Archivos
- `comustock_rag_master_2026-04-10.json`: dataset maestro completo
- `comustock_rag_chunks_2026-04-10.jsonl`: versión chunked para indexación o lectura por LLM

## Cobertura
- 17 páginas
- 801 recursos descargables
- 8 marcas del ecosistema

## Criterios aplicados
- Fuente de contenido: repo `comustock-v3`
- URL canónica: `https://comustock.personal.com.ar`
- Exclusión de SharePoint y contenido técnico/confidencial
- Enfoque en contenido útil para usuarios finales y para un agente de RAG

## Alcance del asistente
- Este chat responde consultas sobre ComuStock.
- Para otras consultas relacionadas con la empresa Personal, consultá a Loopi.
- Loopi es un agente virtual que te acompaña en todas tus gestiones y consultas relacionadas con el Dominio Cultural (Capital Humano).
- Funciona a través de Teams y Copilot.
- Para agregarla, hacelo desde `Teams > Aplicaciones > Loopi`.
- Por cualquier duda o comentario sobre ComuStock, escribí a `equipocomunicacioninterna@personal.com.ar`.

## Nota
Parte del inventario fue verificada directamente por archivo y otra parte se completó siguiendo la convención de carpetas y formatos del repositorio. Esa diferencia está marcada en el campo `verificacion`.
