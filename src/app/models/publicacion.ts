export class Publicacion {
    constructor(
    public _id: string,
    public titulo: string,
    public descripcion: string,
    public precio: string,
    public fechaRegistro: string,
    public estado: any,
    public existencias: string,
    public categoriaPrincipal: string,
    public categoriaSecundaria: string,
    public usuario: string,
    public imgPri: any,
    public imgSec: any,
    public imgTer: any,
    public entregaLat: number,
    public entregaLng: number
    ) {}
}
