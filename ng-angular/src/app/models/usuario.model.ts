export class Usuario {
    constructor(
        public _id: String,
        public usuario: String,
        public nombre: String,
        public apellido: String,
        public direccion: String,
        public telefono: String,
        public correo: String,
        public password: String,
        public rol: String,
        public imagen: String
    ){}
}
