export declare class CreateUserInput {
    email: string;
    name?: string;
    password: string;
}
declare const UpdateUserInput_base: import("@nestjs/mapped-types").MappedType<Partial<CreateUserInput>>;
export declare class UpdateUserInput extends UpdateUserInput_base {
    id: number;
}
export {};
