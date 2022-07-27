var listaUsuarios = [
  {
    usuario: "prueba",
    password: "$2b$10$S2AlraEc6LLmQmnQSjaLCe11/570bOJvsy8U5.xxLbaeVLGSJw.6O",
  },
  {
    usuario: "osvaldo",
    password: "$2b$10$S2AlraEc6LLmQmnQSjaLCe11/570bOJvsy8U5.xxLbaeVLGSJw.6O",
  },
];

class UsuariosFaker {
  constructor() {}
  buscar(patron) {
    return listaUsuarios.find((p) => p.usuario == patron);
  }
}

module.exports = UsuariosFaker;
