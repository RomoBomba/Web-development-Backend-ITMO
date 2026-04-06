"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var StorageService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageService = void 0;
const common_1 = require("@nestjs/common");
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const uuid_1 = require("uuid");
let StorageService = StorageService_1 = class StorageService {
    s3Client;
    bucketName;
    logger = new common_1.Logger(StorageService_1.name);
    constructor() {
        const accessKeyId = process.env.YANDEX_ACCESS_KEY_ID;
        const secretAccessKey = process.env.YANDEX_SECRET_ACCESS_KEY;
        const bucketName = process.env.YANDEX_BUCKET_NAME;
        if (!accessKeyId || !secretAccessKey) {
            throw new Error('YANDEX_ACCESS_KEY_ID and YANDEX_SECRET_ACCESS_KEY must be set in environment');
        }
        if (!bucketName) {
            throw new Error('YANDEX_BUCKET_NAME must be set in environment');
        }
        this.bucketName = bucketName;
        this.s3Client = new client_s3_1.S3Client({
            region: 'ru-central1',
            endpoint: 'https://storage.yandexcloud.net',
            credentials: {
                accessKeyId: accessKeyId,
                secretAccessKey: secretAccessKey,
            },
        });
    }
    async uploadFile(file, folder = 'products') {
        const key = `${folder}/${(0, uuid_1.v4)()}-${file.originalname}`;
        const command = new client_s3_1.PutObjectCommand({
            Bucket: this.bucketName,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
        });
        try {
            await this.s3Client.send(command);
            this.logger.log(`✅ File uploaded: ${key}`);
            return key;
        }
        catch (error) {
            this.logger.error(`❌ Upload failed: ${error.message}`);
            throw error;
        }
    }
    async getFileUrl(key, expiresIn = 3600) {
        const command = new client_s3_1.GetObjectCommand({
            Bucket: this.bucketName,
            Key: key,
        });
        return (0, s3_request_presigner_1.getSignedUrl)(this.s3Client, command, { expiresIn });
    }
};
exports.StorageService = StorageService;
exports.StorageService = StorageService = StorageService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], StorageService);
//# sourceMappingURL=storage.service.js.map