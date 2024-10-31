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
exports.PersonService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const person_entity_1 = require("./entities/person.entity");
const typeorm_2 = require("typeorm");
const users_service_1 = require("../users/users.service");
const teacher_service_1 = require("../teacher/teacher.service");
let PersonService = class PersonService {
    constructor(personRepository, userService, teacherService) {
        this.personRepository = personRepository;
        this.userService = userService;
        this.teacherService = teacherService;
    }
    async create({ personId, full_name, last_name, email_address, address, male, deleteAt, type }) {
        const person = this.personRepository.create({
            id: personId,
            full_name,
            last_name,
            email_address,
            address,
            male,
            userId: null
        });
        await this.personRepository.save(person);
        const username = `${person.full_name} ${person.last_name}`;
        const role = type;
        const user = await this.userService.createUser(username, person.email_address, role);
        const person_update = await this.personRepository.findOne({
            where: { id: person.id }
        });
        Object.assign(person_update, { userId: user.id });
        await this.personRepository.save(person_update);
        if (role === "profesor") {
            const teachercreate = await this.teacherService.create(person.id);
            const teacher = {
                id: teachercreate.id,
                personId: person.id,
                address: person.address,
                deleteAt: person.deleteAt,
                email_address: person.email_address,
                full_name: person.full_name,
                last_name: person.last_name,
                male: person.male,
            };
            return teacher;
        }
        return { person, status: 200, message: 'Padre creado exitosamente' };
    }
    async createFamily({ personId, full_name, last_name, email_address, address, male }, manager) {
        const person = manager.create(person_entity_1.Person, {
            id: personId,
            full_name,
            last_name,
            email_address,
            address,
            male,
            userId: null
        });
        await manager.save(person);
        return person;
    }
    findAll() {
        return `This action returns all person`;
    }
    findOne(id) {
        return `This action returns a #${id} person`;
    }
    update(id, updatePersonDto) {
        return `This action updates a #${id} person`;
    }
    remove(id) {
        return `This action removes a #${id} person`;
    }
};
exports.PersonService = PersonService;
exports.PersonService = PersonService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(person_entity_1.Person)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService,
        teacher_service_1.TeacherService])
], PersonService);
//# sourceMappingURL=person.service.js.map