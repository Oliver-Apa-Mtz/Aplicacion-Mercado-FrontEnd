export class Comentario {
    constructor(
        public autor:string,
        public mensaje: string,
        public fecha: Date,
        public publicacion: string
    ){}
}