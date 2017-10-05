"use strict";
var Publicacion = (function () {
    function Publicacion(_id, titulo, descripcion, precio, fechaRegistro, estado, existencias, lugarEntrega, imagenes, categoria, likes, usuario) {
        this._id = _id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.precio = precio;
        this.fechaRegistro = fechaRegistro;
        this.estado = estado;
        this.existencias = existencias;
        this.lugarEntrega = lugarEntrega;
        this.imagenes = imagenes;
        this.categoria = categoria;
        this.likes = likes;
        this.usuario = usuario;
    }
    return Publicacion;
}());
exports.Publicacion = Publicacion;
//# sourceMappingURL=publicacion.js.map