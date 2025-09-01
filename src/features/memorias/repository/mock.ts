// Mock implementation of MemoriasRepository
import { MemoriasRepository } from "./index";
import { Memoria, MemoriaDetalle, MateriaResumen, MateriaDetalle, Guia } from "../types";

export class MockMemoriasRepository implements MemoriasRepository {
  private memorias: Memoria[] = [
        {
      id: "3",
      filename: "memoria_gr_disenodeinteriores.pdf",
      titulacion: "Grado en Diseño de Interiores",
      uploadedBy: "Elena Vargas",
      uploadedAt: "2024-01-25T09:00:00Z",
      status: "EXTRACTING",
      progress: 3,
      materias: 30,
      guiasGeneradas: 1,
      fileSize: "3.2 MB",
    },
    {
      id: "1",
      filename: "grado_informatica_2024.pdf",
      titulacion: "Grado en Ingeniería Informática",
      uploadedBy: "Miguel Torres",
      uploadedAt: "2024-01-15T10:30:00Z",
      status: "COMPLETED",
      progress: 100,
      materias: 42,
      guiasGeneradas: 42,
      fileSize: "2.5 MB",
    },

  ];

  private materias: MateriaResumen[] = [
    // Materias de Informática (memoria id: "1")
    {
      id: "1",
      codigo: "INF101",
      nombre: "Fundamentos de Programación",
      ects: 6,
      caracter: "Formación Básica",
      cursoSemestre: "1º - S1",
      estado: "GENERADA",
    },
    {
      id: "2",
      codigo: "INF102", 
      nombre: "Matemáticas Discretas",
      ects: 6,
      caracter: "Formación Básica",
      cursoSemestre: "1º - S1",
      estado: "EN_PROGRESO",
    },
    // Materias de Diseño de Interiores (memoria id: "3")
    {
      id: "101",
      codigo: "LDP101",
      nombre: "Lenguaje del proyecto",
      ects: 6,
      caracter: "Básica",
      cursoSemestre: "1º - S1",
      estado: "GENERADA",
    },
    {
      id: "102",
      codigo: "DI102",
      nombre: "Fundamentos del Diseño de Interiores",
      ects: 6,
      caracter: "Básica",
      cursoSemestre: "1º - S1",
      estado: "EN_PROGRESO",
    },
    {
      id: "103",
      codigo: "DI103",
      nombre: "Historia del Arte y del Diseño",
      ects: 6,
      caracter: "Básica",
      cursoSemestre: "1º - S2",
      estado: "EN_PROGRESO",
    },
    {
      id: "104",
      codigo: "DI104",
      nombre: "Matemáticas Aplicadas al Diseño",
      ects: 6,
      caracter: "Básica",
      cursoSemestre: "1º - S2",
      estado: "EN_PROGRESO",
    },
    {
      id: "105",
      codigo: "DI105",
      nombre: "Geometría Descriptiva",
      ects: 6,
      caracter: "Básica",
      cursoSemestre: "1º - S2",
      estado: "EN_PROGRESO",
    },
    {
      id: "106",
      codigo: "DI106",
      nombre: "Color y Iluminación",
      ects: 6,
      caracter: "Obligatoria",
      cursoSemestre: "2º - S1",
      estado: "EN_PROGRESO",
    },
    {
      id: "107",
      codigo: "DI107",
      nombre: "Materiales y Tecnología",
      ects: 6,
      caracter: "Obligatoria",
      cursoSemestre: "2º - S1",
      estado: "EN_PROGRESO",
    },
    {
      id: "108",
      codigo: "DI108",
      nombre: "Diseño Asistido por Ordenador",
      ects: 6,
      caracter: "Obligatoria",
      cursoSemestre: "2º - S1",
      estado: "EN_PROGRESO",
    },
    {
      id: "109",
      codigo: "DI109",
      nombre: "Ergonomía y Antropometría",
      ects: 6,
      caracter: "Obligatoria",
      cursoSemestre: "2º - S2",
      estado: "EN_PROGRESO",
    },
    {
      id: "110",
      codigo: "DI110",
      nombre: "Construcción y Estructura",
      ects: 6,
      caracter: "Obligatoria",
      cursoSemestre: "2º - S2",
      estado: "EN_PROGRESO",
    },
    {
      id: "111",
      codigo: "DI111",
      nombre: "Psicología del Espacio",
      ects: 6,
      caracter: "Obligatoria",
      cursoSemestre: "2º - S2",
      estado: "EN_PROGRESO",
    },
    {
      id: "112",
      codigo: "DI112",
      nombre: "Proyecto de Interiores I",
      ects: 9,
      caracter: "Obligatoria",
      cursoSemestre: "3º - S1",
      estado: "EN_PROGRESO",
    },
    {
      id: "113",
      codigo: "DI113",
      nombre: "Decoración y Ambientación",
      ects: 6,
      caracter: "Obligatoria",
      cursoSemestre: "3º - S1",
      estado: "EN_PROGRESO",
    },
    {
      id: "114",
      codigo: "DI114",
      nombre: "Sostenibilidad en el Diseño",
      ects: 6,
      caracter: "Obligatoria",
      cursoSemestre: "3º - S1",
      estado: "EN_PROGRESO",
    },
    {
      id: "115",
      codigo: "DI115",
      nombre: "Proyecto de Interiores II",
      ects: 9,
      caracter: "Obligatoria",
      cursoSemestre: "3º - S2",
      estado: "EN_PROGRESO",
    },
    {
      id: "116",
      codigo: "DI116",
      nombre: "Diseño de Mobiliario",
      ects: 6,
      caracter: "Obligatoria",
      cursoSemestre: "3º - S2",
      estado: "EN_PROGRESO",
    },
    {
      id: "117",
      codigo: "DI117",
      nombre: "Instalaciones en Edificación",
      ects: 6,
      caracter: "Obligatoria",
      cursoSemestre: "3º - S2",
      estado: "EN_PROGRESO",
    },
    {
      id: "118",
      codigo: "DI118",
      nombre: "Gestión de Proyectos",
      ects: 6,
      caracter: "Obligatoria",
      cursoSemestre: "4º - S1",
      estado: "EN_PROGRESO",
    },
    {
      id: "119",
      codigo: "DI119",
      nombre: "Diseño de Espacios Comerciales",
      ects: 6,
      caracter: "Optativa",
      cursoSemestre: "4º - S1",
      estado: "EN_PROGRESO",
    },
    {
      id: "120",
      codigo: "DI120",
      nombre: "Diseño de Espacios Residenciales",
      ects: 6,
      caracter: "Optativa",
      cursoSemestre: "4º - S1",
      estado: "EN_PROGRESO",
    },
    {
      id: "121",
      codigo: "DI121",
      nombre: "Diseño de Espacios Culturales",
      ects: 6,
      caracter: "Optativa",
      cursoSemestre: "4º - S2",
      estado: "EN_PROGRESO",
    },
    {
      id: "122",
      codigo: "DI122",
      nombre: "Fotografía de Interiores",
      ects: 6,
      caracter: "Optativa",
      cursoSemestre: "4º - S2",
      estado: "EN_PROGRESO",
    },
    {
      id: "123",
      codigo: "DI123",
      nombre: "Diseño Universal",
      ects: 6,
      caracter: "Optativa",
      cursoSemestre: "4º - S2",
      estado: "EN_PROGRESO",
    },
    {
      id: "124",
      codigo: "DI124",
      nombre: "Marketing y Comunicación",
      ects: 6,
      caracter: "Optativa",
      cursoSemestre: "4º - S1",
      estado: "EN_PROGRESO",
    },
    {
      id: "125",
      codigo: "DI125",
      nombre: "Legislación y Normativa",
      ects: 6,
      caracter: "Obligatoria",
      cursoSemestre: "4º - S1",
      estado: "EN_PROGRESO",
    },
    {
      id: "126",
      codigo: "DI126",
      nombre: "Prácticas Externas",
      ects: 12,
      caracter: "Obligatoria",
      cursoSemestre: "4º - S2",
      estado: "EN_PROGRESO",
    },
    {
      id: "127",
      codigo: "DI127",
      nombre: "Trabajo Fin de Grado",
      ects: 12,
      caracter: "Obligatoria",
      cursoSemestre: "4º - S2",
      estado: "EN_PROGRESO",
    },
    {
      id: "128",
      codigo: "DI128",
      nombre: "Tendencias en Diseño",
      ects: 6,
      caracter: "Optativa",
      cursoSemestre: "4º - S1",
      estado: "EN_PROGRESO",
    },
    {
      id: "129",
      codigo: "DI129",
      nombre: "Diseño de Stands y Eventos",
      ects: 6,
      caracter: "Optativa",
      cursoSemestre: "4º - S2",
      estado: "EN_PROGRESO",
    },
    {
      id: "130",
      codigo: "DI130",
      nombre: "Metodología de Investigación",
      ects: 6,
      caracter: "Obligatoria",
      cursoSemestre: "4º - S1",
      estado: "EN_PROGRESO",
    },
  ];

  private guias: Guia[] = [
    {
      id: "1",
      memoriaId: "1",
      materiaId: "1",
      titulo: "Guía de Fundamentos de Programación",
      descripcion: "Guía de aprendizaje para la asignatura",
      archivo: "guia_fundamentos_programacion.pdf",
      fechaCreacion: "2024-01-16T09:00:00Z",
      estado: "COMPLETADA",
      tamano: "1.2 MB",
    },
    {
      id: "2",
      memoriaId: "3",
      materiaId: "101",
      titulo: "Guía de Lenguaje del proyecto",
      descripcion: "Guía de aprendizaje para la asignatura Lenguaje del proyecto",
      archivo: "guia_lenguaje_proyecto.pdf",
      fechaCreacion: "2024-01-26T10:00:00Z",
      estado: "COMPLETADA",
      tamano: "1.5 MB",
    },
  ];

  async listarMemorias(): Promise<Memoria[]> {
    return [...this.memorias];
  }

  async listarRecientes(): Promise<Memoria[]> {
    return this.memorias.slice(0, 3);
  }

  async obtenerMemoria(id: string): Promise<Memoria> {
    const memoria = this.memorias.find(m => m.id === id);
    if (!memoria) throw new Error(`Memoria ${id} not found`);
    return memoria;
  }

  async detalleMemoria(id: string): Promise<MemoriaDetalle> {
    const memoria = await this.obtenerMemoria(id);
    const materiasMemoria = await this.listarMaterias(id);
    
    // Información específica por memoria
    const infoMemoria = {
      "1": {
        cursoAcademico: "2024-2025",
        escuela: "Escuela Técnica Superior de Ingeniería",
        plan: "Plan 2020",
      },
      "3": {
        cursoAcademico: "2024-2025", 
        escuela: "Arquitectura, Ingeniería y Diseño - Campus Creativo",
        plan: "Plan 2020",
      }
    };
    
    const info = infoMemoria[id as keyof typeof infoMemoria] || infoMemoria["1"];
    
    return {
      ...memoria,
      ...info,
      totalMaterias: memoria.materias,
      guiasCompletadas: memoria.guiasGeneradas,
      guiasPendientes: memoria.materias - memoria.guiasGeneradas, 
      errores: 0,
      materias: materiasMemoria,
      erroresDetectados: [],
    };
  }

  async subirMemoria(file: File): Promise<Memoria> {
    const newMemoria: Memoria = {
      id: Date.now().toString(),
      filename: file.name,
      titulacion: "Nueva Titulación",
      uploadedBy: "usuario",
      uploadedAt: new Date().toISOString(),
      status: "UPLOADED",
      progress: 0,
      materias: 0,
      guiasGeneradas: 0,
      fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
    };
    this.memorias.push(newMemoria);
    return newMemoria;
  }

  async procesarMemoria(id: string): Promise<void> {
    // Mock processing
  }

  async eliminarMemoria(id: string): Promise<void> {
    const index = this.memorias.findIndex(m => m.id === id);
    if (index === -1) throw new Error(`Memoria ${id} not found`);
    this.memorias.splice(index, 1);
  }

  async listarMaterias(memoriaId: string): Promise<MateriaResumen[]> {
    // Filtrar materias por memoria ID
    const materiasPorMemoria: { [key: string]: string[] } = {
      "1": ["1", "2"], // Informática - solo 2 materias como ejemplo
      "3": ["101", "102", "103", "104", "105", "106", "107", "108", "109", "110", 
            "111", "112", "113", "114", "115", "116", "117", "118", "119", "120", 
            "121", "122", "123", "124", "125", "126", "127", "128", "129", "130"], // Diseño de Interiores - 30 materias
    };
    
    const materiaIds = materiasPorMemoria[memoriaId] || [];
    return this.materias.filter(m => materiaIds.includes(m.id));
  }

  async obtenerMateria(memoriaId: string, materiaId: string): Promise<MateriaDetalle> {
    const materia = this.materias.find(m => m.id === materiaId);
    if (!materia) throw new Error(`Materia ${materiaId} not found`);
    
    // Información específica para "Lenguaje del proyecto"
    if (materiaId === "101") {
      return {
        ...materia,
        curso: 1,
        semestre: 1,
        idioma: "Castellano",
        modalidad: "Presencial y virtual",
        docenteCoordinador: "",
        cursoAcademico: "",
        presentacion: "Lenguaje gráfico: rigor y expresividad. La construcción gráfica: los usos de los sistemas de representación percepción, conocimiento y descripción. Los conceptos de escala física, conceptual y relacional. Los recursos gráficos punto, línea y superficie. Conceptos relacionados con la proyección, la sección y sus tipos. Planos acotados.",
        competencias: [
          "COMP1 - Capacidad de demostrar conocimientos avanzados y una comprensión de los aspectos teóricos y prácticos",
          "COMP7 - Capacidad para describir los principios del dimensionado y la geometría analítica básica",
          "COMP8 - Capacidad para analizar las características de un proyecto de interiorismo",
          "COMP12 - Capacidad para aplicar los sistemas de representación espacial en los proyectos de diseño de interiores",
          "COMP32 - Capacidad para crear ideas nuevas y conceptos a partir de ideas y conceptos conocidos",
          "COMP36 - Capacidad para cooperar con otros en la consecución de un objetivo compartido",
          "COMP39 - Capacidad para mostrar comportamientos éticos y compromiso social"
        ],
        resultadosAprendizaje: [
          "CON3 - Identificar las necesidades del usuario dando soluciones en el proyecto de diseño de interiores",
          "CON5 - Definir en proyectos de diseño interior las ideas y sus referencias visuales",
          "HAB1 - Aplicar técnicas gráficas que permitan manifestar el pensamiento analítico y crítico",
          "Reconocer la documentación gráfica diversa referida a un espacio diseñado",
          "Representar gráficamente la configuración geométrica de las formas y superficies arquitectónicas",
          "Utilizar la expresión gráfica como instrumento para el diseño y análisis de espacios",
          "Diseñar imágenes relativas a proyectos propios o ajenos que comuniquen la idea del espacio interior"
        ],
        contenidos: "- Lenguaje gráfico: rigor y expresividad\n- La construcción gráfica: los usos de los sistemas de representación percepción, conocimiento y descripción\n- Los conceptos de escala física, conceptual y relacional\n- Los recursos gráficos punto, línea y superficie\n- Conceptos relacionados con la proyección, la sección y sus tipos\n- Planos acotados",
        actividadesFormativas: [
          { actividad: "Clases magistrales", horas: 12 },
          { actividad: "Seminarios de aplicación práctica", horas: 18 },
          { actividad: "Elaboración de informes y escritos", horas: 5 },
          { actividad: "Investigaciones y proyectos", horas: 37 },
          { actividad: "Trabajo autónomo", horas: 56 },
          { actividad: "Debates y coloquios", horas: 8 },
          { actividad: "Tutoría", horas: 12 },
          { actividad: "Pruebas de evaluación presencial", horas: 2 },
        ],
        sistemaEvaluacion: [
          { sistema: "Pruebas de evaluación presenciales", porcentaje: "50-60%", descripcion: "Examen final presencial" },
          { sistema: "Informes y escritos", porcentaje: "10-20%", descripcion: "Elaboración de documentos y reportes" },
          { sistema: "Investigaciones y proyectos", porcentaje: "15-45%", descripcion: "Proyectos prácticos de la asignatura" },
        ],
        metadata: {
          ultimaModificacion: "2024-01-25T10:00:00Z",
          version: "1.0",
          estado: "Publicada",
          generadaPor: "Sistema de extracción de memorias",
          fechaGeneracion: "2024-01-26T10:00:00Z",
        },
      };
    }
    
    // Información genérica para otras materias
    return {
      ...materia,
      curso: 1,
      semestre: 1,
      idioma: "Español",
      modalidad: "Presencial",
      docenteCoordinador: "Dr. Juan Pérez",
      cursoAcademico: "2024-2025",
      presentacion: "Asignatura de introducción...",
      competencias: ["CG1", "CE1", "CE2"],
      resultadosAprendizaje: ["RA1", "RA2", "RA3"],
      contenidos: "1. Introducción\n2. Variables\n3. Estructuras de control",
      actividadesFormativas: [
        { actividad: "Clases magistrales", horas: 45 },
        { actividad: "Prácticas de laboratorio", horas: 30 },
      ],
      sistemaEvaluacion: [
        { sistema: "Examen final", porcentaje: "60%", descripcion: "Examen teórico-práctico" },
        { sistema: "Prácticas", porcentaje: "40%", descripcion: "Evaluación continua" },
      ],
      metadata: {
        ultimaModificacion: "2024-01-20T10:00:00Z",
        version: "1.0",
        estado: "Publicada",
      },
    };
  }

  async actualizarMateria(memoriaId: string, materiaId: string, patch: Partial<MateriaDetalle>): Promise<MateriaDetalle> {
    const materia = await this.obtenerMateria(memoriaId, materiaId);
    return { ...materia, ...patch };
  }

  async eliminarMateria(memoriaId: string, materiaId: string): Promise<void> {
    // Mock deletion
  }

  async listarGuias(memoriaId: string): Promise<Guia[]> {
    return this.guias.filter(g => g.memoriaId === memoriaId);
  }

  async generarGuia(memoriaId: string, materiaId: string): Promise<Guia> {
    const newGuia: Guia = {
      id: Date.now().toString(),
      memoriaId,
      materiaId,
      titulo: "Nueva Guía",
      descripcion: "Guía generada",
      archivo: "nueva_guia.pdf",
      fechaCreacion: new Date().toISOString(),
      estado: "GENERADA",
      tamano: "800 KB",
    };
    this.guias.push(newGuia);
    return newGuia;
  }

  async aprobarGuia(memoriaId: string, materiaId: string): Promise<void> {
    const guia = this.guias.find(g => g.memoriaId === memoriaId && g.materiaId === materiaId);
    if (guia) {
      guia.estado = "COMPLETADA";
    }
  }

  async rechazarGuia(memoriaId: string, materiaId: string, reason?: string): Promise<void> {
    // Mock rejection
  }

  async descargarGuiaPDF(memoriaId: string, materiaId: string): Promise<Blob> {
    return new Blob(['Mock PDF content'], { type: 'application/pdf' });
  }

  async descargarGuiaWord(memoriaId: string, materiaId: string): Promise<Blob> {
    return new Blob(['Mock Word content'], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
  }

  async descargarTodasGuias(memoriaId: string): Promise<Blob> {
    return new Blob(['Mock ZIP content'], { type: 'application/zip' });
  }
}