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
exports.StudentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const student_entity_1 = require("./entities/student.entity");
const typeorm_2 = require("typeorm");
const person_entity_1 = require("../person/entities/person.entity");
const responsible_entity_1 = require("../responsible/entities/responsible.entity");
const person_service_1 = require("../person/person.service");
const users_service_1 = require("../users/users.service");
let StudentService = class StudentService {
    constructor(studentRepository, personRepository, responsibleRepository, personService, userService, dataSoruce) {
        this.studentRepository = studentRepository;
        this.personRepository = personRepository;
        this.responsibleRepository = responsibleRepository;
        this.personService = personService;
        this.userService = userService;
        this.dataSoruce = dataSoruce;
    }
    async create(createStudentDto) {
        const { family, ...studentData } = createStudentDto;
        console.log("create student ---");
        const queryRunner = this.dataSoruce.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const student = queryRunner.manager.create(student_entity_1.Student, studentData);
            await queryRunner.manager.save(student);
            if (family && family.length > 0) {
                const responsibles = await Promise.all(family.map(async (member) => {
                    const person = await this.personService.createFamily(member, queryRunner.manager);
                    const responsible = queryRunner.manager.create(responsible_entity_1.Responsible, {
                        student,
                        person,
                        type: member.type
                    });
                    return responsible;
                }));
                await queryRunner.manager.save(responsibles);
            }
            if (studentData.email_address) {
                const username = `${studentData.full_name}  ${studentData.last_name}`;
                const user = await this.userService.createUser(username, studentData.email_address, 'estudiante');
                const person_update = await queryRunner.manager.findOne(student_entity_1.Student, {
                    where: { id: student.id }
                });
                Object.assign(person_update, { userId: user.id });
                await queryRunner.manager.save(person_update);
            }
            await queryRunner.commitTransaction();
            return student;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    findAll() {
        return `This action returns all student`;
    }
    findOne(id) {
        return `This action returns a #${id} student`;
    }
    update(id, updateStudentDto) {
        return `This action updates a #${id} student`;
    }
    remove(id) {
        return `This action removes a #${id} student`;
    }
};
exports.StudentService = StudentService;
exports.StudentService = StudentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(student_entity_1.Student)),
    __param(1, (0, typeorm_1.InjectRepository)(person_entity_1.Person)),
    __param(2, (0, typeorm_1.InjectRepository)(responsible_entity_1.Responsible)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        person_service_1.PersonService,
        users_service_1.UsersService,
        typeorm_2.DataSource])
], StudentService);
//# sourceMappingURL=student.service.js.map