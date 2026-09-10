---
name: git-commit-es
description: >-
  Crea, estructura y ejecuta mensajes de commit en Git en español siguiendo la convención
  Conventional Commits. Incluye autoría del desarrollador, identificación de la IA asistente (Gemini 3.8 Flash),
  contexto técnico, impacto y referencias para una trazabilidad completa.
---

# Skill: Commits Profesionales en Español (PRIGMA)

Esta skill define el procedimiento y formato estándar para la creación de commits en el repositorio de PRIGMA, garantizando un historial limpio, trazable y en español con metadatos de desarrollo con IA.

---

## 1. Estructura Estándar del Mensaje de Commit

Cada mensaje de commit debe seguir la siguiente estructura:

```text
<tipo>(<alcance>): <descripción corta en español, verbo en presente/infinitivo, máx 72 caracteres>

[Línea en blanco obligatoria]

<Descripción detallada del motivo del cambio y el contexto del problema o requerimiento>

Cambios principales:
- <Detalle específico 1>
- <Detalle específico 2>
- <Detalle específico 3>

Metadatos de Trazabilidad:
- Autor: <Nombre del desarrollador, ej. Christian>
- Asistente IA: Antigravity (Gemini 3.8 Flash)
- Impacto: <Sin breaking changes | Requiere migración en Supabase | Requiere variables de entorno>
- Referencias: <Ticket, issue o PR relacionado si aplica>
```

---

## 2. Tipos de Commit Permitidos (Conventional Commits)

Usa siempre letras minúsculas para el tipo:

| Tipo | Cuándo Usarlo | Ejemplo en Español |
| :--- | :--- | :--- |
| **`feat`** | Nueva funcionalidad o módulo para el usuario/sistema | `feat(tasks): implementar módulo de gestión de tareas en admin` |
| **`fix`** | Corrección de un error o bug | `fix(tasks): corregir parseo de fechas vacías en supabase` |
| **`docs`** | Cambios exclusivos en documentación o archivos Markdown | `docs(readme): actualizar guía de variables de entorno` |
| **`style`** | Cambios de formato, identación, espacios, clases visuales sin alterar lógica | `style(sidebar): alinear espaciado de navegación` |
| **`refactor`** | Reestructuración de código sin alterar comportamiento externo ni corregir bugs | `refactor(actions): modularizar server actions de tareas` |
| **`perf`** | Mejora de rendimiento o consumo de recursos | `perf(tasks): agregar índices sql para filtrado rápido` |
| **`test`** | Adición o corrección de pruebas automatizadas | `test(tasks): agregar pruebas para server actions` |
| **`build`** | Cambios en dependencias, empaquetado o herramientas de compilación | `build(deps): actualizar dependencias de pnpm` |
| **`ci`** | Cambios en workflows de CI/CD | `ci(github): configurar validación de tipos con tsc` |
| **`chore`** | Mantenimiento rutinario, tareas menores o configuración general | `chore(types): actualizar interfaces de supabase` |
| **`revert`** | Reversión de un commit previo | `revert(tasks): revertir commit anterior` |

---

## 3. Información Relevante a Incluir (Campos Clave)

Para asegurar la máxima calidad y auditoría del historial de cambios:

1. **Autor Humano**: Extraído de `git config user.name` o proporcionado por el usuario (ej. `Christian`).
2. **Asistente IA**: Identificación transparente del modelo/herramienta: **Antigravity (Gemini 3.8 Flash)**.
3. **Contexto / Motivación**: Explicar el *por qué* se hizo el cambio, no únicamente el *qué*.
4. **Lista de Cambios Clave**: Viñetas concisas con las modificaciones sustanciales.
5. **Impacto Técnico / Tareas Post-Despliegue**:
   - Indicar si requiere ejecutar migraciones en Supabase SQL Editor.
   - Indicar si requiere nuevas variables en `.env`.
   - Indicar si requiere compilar o ejecutar `pnpm build`.
6. **Breaking Changes**: Si hay un cambio incompatible, marcar claramente: `BREAKING CHANGE: <descripción>`.

---

## 4. Procedimiento de Ejecución del Agente

Cuando se active esta skill para realizar o preparar un commit:

1. **Analizar el estado**:
   - Ejecutar `git status` y `git diff --staged` (o `git diff` si no se ha hecho stage aún).
   - Identificar los archivos modificados, añadidos o eliminados.

2. **Obtener autoría**:
   - Consultar `git config user.name` y `git config user.email`.

3. **Determinar la IA activa**:
   - **Antigravity (Gemini 3.8 Flash)**.

4. **Verificar impacto post-despliegue**:
   - ¿Hay migraciones de Supabase?
   - ¿Hay nuevas variables de entorno?

5. **Construir el mensaje formateado**:
   - Redactar título y cuerpo respetando la estructura de la sección 1.

6. **Ejecutar el commit**:
   - Usar `git add` para los archivos correspondientes.
   - Ejecutar `git commit -m "..."`.
