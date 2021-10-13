export class AppConstants {

    public static get baseServidor(): string {
        return "https://api-restrevdev.herokuapp.com/api-rest/"
    }

    public static get baseLogin(): string {
        return this.baseServidor + "login"
    }

    public static get baseRegister(): string {
        return this.baseServidor + "usuario/register"
    }

    
}
