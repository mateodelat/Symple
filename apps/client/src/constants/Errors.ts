export type ErrorCode =
  | 300
  | 301
  | 302
  | 303
  | 304
  | 305
  | 307
  | 308
  | 400
  | 401
  | 402
  | 403
  | 404
  | 405
  | 406
  | 407
  | 408
  | 409
  | 410
  | 411
  | 412
  | 413
  | 414
  | 415
  | 416
  | 417
  | 418
  | 420
  | 421
  | 422
  | 423
  | 424
  | 425
  | 426
  | 428
  | 429
  | 431
  | 444
  | 450
  | 451
  | 497
  | 498
  | 499
  | 500
  | 501
  | 502
  | 503
  | 504
  | 506
  | 507
  | 508
  | 509
  | 510
  | 511
  | 521
  | 522
  | 523
  | 525
  | 530
  | 599;

export const errors: Record<ErrorCode, string> = {
  300: "Múltiples opciones",
  301: "Movido permanentemente",
  302: "Encontrado",
  303: "Ver otro",
  304: "No modificado",
  305: "Usar proxy",
  307: "Redirección temporal",
  308: "Redirección permanente",
  400: "Solicitud incorrecta",
  401: "No está autorizado para realizar esta acción",
  402: "Pago requerido",
  403: "Acción prohibida",
  404: "No se encontró el recurso",
  405: "Método no permitido",
  406: "No aceptable",
  407: "Autenticación de proxy requerida",
  408: "Tiempo de espera de solicitud",
  409: "Conflicto",
  410: "Se ha ido",
  411: "Longitud requerida",
  412: "Falló la condición previa",
  413: "Entidad de solicitud demasiado grande",
  414: "URI demasiado largo",
  415: "Tipo de medio no soportado",
  416: "Rango solicitado no satisfactorio",
  417: "Falló la expectativa",
  418: "Soy una tetera",
  420: "Política de mejora",
  421: "Se requiere conexión",
  422: "Entidad no procesable",
  423: "Bloqueado",
  424: "Dependencia fallida",
  425: "Demasiadas solicitudes",
  426: "Actualización requerida",
  428: "Precondición requerida",
  429: "Demasiadas solicitudes",
  431: "Campos de encabezado demasiado grandes",
  444: "Sin respuesta",
  450: "Bloqueado por los controles parentales de Windows",
  451: "No disponible por razones legales",
  497: "Error de certificado",
  498: "Token de token expirado / inválido",
  499: "Cliente cerró la solicitud",
  500: "Error interno del servidor",
  501: "No implementado",
  502: "Puerta de enlace incorrecta",
  503: "Servicio no disponible",
  504: "Tiempo de espera de la puerta de enlace",
  506: "Variante también negocia",
  507: "Almacenamiento insuficiente",
  508: "Bucle detectado",
  509: "Límite de ancho de banda excedido",
  510: "No extendido",
  511: "Autenticación de red requerida",
  521: "Web Server está caído",
  522: "Conexión de origen se agotó",
  523: "Tiempo de inactividad del origen",
  525: "SSL Handshake falló",
  530: "Sitio en construcción",
  599: "Error de conexión de red",
};

export const formErrors = {
  required: "Este campo es requerido",
  email: "El correo electrónico no es válido",
  minLength: "Este campo debe tener al menos {min} caracteres",
  maxLength: "Este campo debe tener menos de {max} caracteres",
  min: "Este campo debe ser mayor o igual a {min}",
  max: "Este campo debe ser menor o igual a {max}",
  pattern: "El formato no es válido",
};
