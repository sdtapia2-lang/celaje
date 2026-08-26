# Catálogo de patrones

Listado de los cinco patrones de celosía disponibles, con sus datos de fabricación
medidos sobre la geometría real de cada trazado (fuente: [`src/config/patrones.json`](../src/config/patrones.json)).

| Muestra | Nombre | Descripción | % Calado | Módulo | Tira |
| --- | --- | --- | --- | --- | --- |
| ![Reticula de rombos](../public/patrones/reticula-de-rombos.svg) | Reticula de rombos | El trazado más elemental de la familia: los puntos medios de una cuadrícula unidos entre sí. Sin rosetas ni entrelazado, es el que menos cambios de dirección pide a la fresadora y por eso el más económico de mecanizar. | 65% | 200 mm | 27 mm |
| ![Estrella de seis](../public/patrones/estrella-de-seis.svg) | Estrella de seis | Construida sobre retícula hexagonal. La estrella de seis puntas es de las formas más antiguas del repertorio y la más luminosa del catálogo: deja pasar más luz que ninguna otra a igual ancho de tira. | 62% | 240 mm | 15 mm |
| ![Octogono y cruz](../public/patrones/octogono-y-cruz.svg) | Octogono y cruz | Octágonos regulares separados por pequeñas cruces. Aparece igual en la carpintería mudéjar y en el azulejo, y su tira ancha lo hace el más resistente de todos: el indicado para vanos grandes o exterior expuesto. | 58% | 210 mm | 34 mm |
| ![Khatam andalusi](../public/patrones/khatam-andalusi.svg) | Khatam andalusi | Trazado sobre el teselado de octágonos y cuadrados, el que sostiene las celosías de al-Andalus y del Magreb. Dibujo denso y de sombra muy gráfica, la familia a la que pertenece el primer prototipo del taller. | 55% | 280 mm | 33 mm |
| ![Roseta de doce](../public/patrones/roseta-de-doce.svg) | Roseta de doce | Dodecágonos y triángulos. La roseta de doce puntas es el registro más ornamental del repertorio persa. Pide vanos amplios: bajo 1,5 m de ancho la estrella se corta y el dibujo no llega a leerse completo. | 52% | 340 mm | 26 mm |
| ![Tabla hexagonal](../public/patrones/tabla-hexagonal.svg) | Tabla hexagonal | Trazado sobre el teselado trihexagonal, de triángulos y hexágonos alternados: la construcción de la "tabla" de doble nivel del repertorio mogol. Reparte la sombra en un entramado más fino que el de la estrella de seis, sobre la misma retícula hexagonal. | 57% | 260 mm | 14 mm |

> **Tabla hexagonal** es un patrón nuevo, sumado a partir del curso Jaali Screens (carpeta `Curso.lnk.lnk` → `JAALI SCREENS`, Semana 6: *"Dual Level Tabla Design & Variations"*). Usa el teselado `3.6.3.6` (triángulos y hexágonos), ya soportado por el motor de generación pero sin ningún patrón construido sobre él hasta ahora. Su tira (14 mm) queda justo en el mínimo de fabricación — conviene validarla con una pieza de prueba antes de producir en serie.

## Notas

- **% Calado**: porcentaje de vacío (área que deja pasar luz) sobre el total del panel.
- **Módulo**: tamaño en mm de la celda base que se repite para generar el patrón.
- **Tira**: ancho mínimo en mm de la tira de madera que forma el trazado; determina la resistencia estructural de la pieza.
- Los patrones marcados como `destacado: true` en `patrones.json` (Estrella de seis, Khatam andalusi, Roseta de doce) son los que se muestran en la portada.
- La geometría fuente (SVG) de cada patrón vive en [`public/patrones/`](../public/patrones/) y se genera con [`scripts/generar-patrones.mjs`](../scripts/generar-patrones.mjs).
