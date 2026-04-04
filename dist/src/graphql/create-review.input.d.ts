export declare class CreateReviewInput {
    rating: number;
    comment?: string;
    userId: number;
    productId: number;
}
declare const UpdateReviewInput_base: import("@nestjs/mapped-types").MappedType<Partial<CreateReviewInput>>;
export declare class UpdateReviewInput extends UpdateReviewInput_base {
    id: number;
}
export {};
