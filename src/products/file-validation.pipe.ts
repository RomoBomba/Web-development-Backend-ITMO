import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class FileValidationPipe implements PipeTransform {
    transform(file: Express.Multer.File) {
        const maxSize = 5 * 1024 * 1024;
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];

        if (!file) {
            throw new BadRequestException('Файл не загружен');
        }

        if (file.size > maxSize) {
            throw new BadRequestException('Файл слишком большой (макс. 5MB)');
        }

        if (!allowedTypes.includes(file.mimetype)) {
            throw new BadRequestException('Неподдерживаемый тип файла. Разрешены: JPEG, PNG, WEBP');
        }

        return file;
    }
}