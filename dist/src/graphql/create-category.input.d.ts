export declare class CreateCategoryInput {
    name: string;
}
declare const UpdateCategoryInput_base: import("@nestjs/mapped-types").MappedType<Partial<CreateCategoryInput>>;
export declare class UpdateCategoryInput extends UpdateCategoryInput_base {
    id: number;
}
export {};
