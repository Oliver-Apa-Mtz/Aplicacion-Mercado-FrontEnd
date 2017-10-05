export class Usuario {
    constructor(
        public _id: string,
        public nombre: string,
        public apellido: string,
        public email: string,
        public password: string,
        public tipo: string,
        public telefono: string,
        public imagen: string,
        public fechaRegistro: Date,
        public favoritos: Array<string>,
        public ventas: Array<string>,
        public compras: Array<string>,
        public ofertasHechas: Array<string>,
        public ofertasRecibidas: Array<string>
    ) {}
}
