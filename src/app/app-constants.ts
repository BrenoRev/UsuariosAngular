export class AppConstants {

    public static get baseServidor(): string {
        //return "http://api-restrevdev.herokuapp.com/api-rest/"
        return "http://localhost:8081/api-rest/"
    }

    public static get baseLogin(): string {
        return this.baseServidor + "login"
    }

    public static get baseRegister(): string {
        return this.baseServidor + "usuario/register"
    }

    
}
