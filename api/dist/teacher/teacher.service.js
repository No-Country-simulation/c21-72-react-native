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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeacherService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const teacher_entity_1 = require("./entities/teacher.entity");
const typeorm_2 = require("typeorm");
let TeacherService = class TeacherService {
    constructor(teacherRepository) {
        this.teacherRepository = teacherRepository;
    }
    async create(personId) {
        const teacher = this.teacherRepository.create({
            person: { id: personId }
        });
        await this.teacherRepository.save(teacher);
        return teacher;
    }
    async findAll(offset = 0, limit = 10) {
        const teachers = await this.teacherRepository.find({
            relations: ['person'],
            skip: offset,
            take: limit,
        });
        return teachers;
    }
    async findOne(id) {
        const teacher_person = await this.teacherRepository.findOne({
            relations: ['person'],
            where: { id: id }
        });
        const teacher = {
            id: teacher_person.id,
            personId: teacher_person.person.id,
            address: teacher_person.person.address,
            deleteAt: teacher_person.person.deleteAt,
            email_address: teacher_person.person.email_address,
            full_name: teacher_person.person.full_name,
            last_name: teacher_person.person.last_name,
            male: teacher_person.person.male,
        };
        return teacher;
        return `This action returns a #${id} teacher`;
    }
    update(id, updateTeacherDto) {
        return `This action updates a #${id} teacher`;
    }
    remove(id) {
        return `This action removes a #${id} teacher`;
    }
};
exports.TeacherService = TeacherService;
exports.TeacherService = TeacherService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(teacher_entity_1.Teacher)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TeacherService);
//# sourceMappingURL=teacher.service.js.map