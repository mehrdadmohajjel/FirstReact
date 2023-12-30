export interface IPerson{
    id: number;
    firstName: string;
    lastName: string;
    BirthDate?: Date;
    address: string;
    password?:string;
    salt?:string;
    isActive?:boolean;
}