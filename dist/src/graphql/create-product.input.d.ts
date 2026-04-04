export declare class CreateProductInput {
    name: string;
    description?: string;
    price: number;
    image?: string;
    categoryId: number;
}
declare const UpdateProductInput_base: import("@nestjs/common").Type<Partial<CreateProductInput>>;
export declare class UpdateProductInput extends UpdateProductInput_base {
    id: number;
}
export {};
