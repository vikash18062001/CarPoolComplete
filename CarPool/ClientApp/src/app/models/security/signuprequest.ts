export class SignUpRequest {
    email: string;
    password: string;
    confirmPassword: string;

    constructor(args: any) {
        args = !!args ? args : {};
        this.email = args.email ? args.email : '';
        this.password = args.pswd ? args.pswd : '';
        this.confirmPassword = args.password ? args.password : '';
    }
}