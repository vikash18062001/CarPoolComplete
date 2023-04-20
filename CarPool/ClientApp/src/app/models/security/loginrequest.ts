export class LoginRequest {
    email: string;
    password: string;

    constructor(args: any) {
        args = !!args ? args : {};
        this.email = args.email ? args.email : '';
        this.password = args.pswd ? args.pswd : '';
    }
}