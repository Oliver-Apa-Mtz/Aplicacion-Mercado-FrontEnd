"use strict";
var Usuario = (function () {
    function Usuario(_id, nombre, apellido, email, password, tipo, telefono, imagen, fechaRegistro, calificaciones, favoritos) {
        this._id = _id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.password = password;
        this.tipo = tipo;
        this.telefono = telefono;
        this.imagen = imagen;
        this.fechaRegistro = fechaRegistro;
        this.calificaciones = calificaciones;
        this.favoritos = favoritos;
    }
    return Usuario;
}());
exports.Usuario = Usuario;
//# sourceMappingURL=usuario.js.map