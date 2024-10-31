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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("typeorm");
const crypto_1 = require("crypto");
const mailer_1 = require("@nestjs-modules/mailer");
const bcryptjs = require("bcryptjs");
const person_entity_1 = require("../person/entities/person.entity");
const responsible_entity_1 = require("../responsible/entities/responsible.entity");
const student_entity_1 = require("../student/entities/student.entity");
let UsersService = class UsersService {
    constructor(userRepository, personRepository, studentRepository, responsibleRepository, mailerService) {
        this.userRepository = userRepository;
        this.personRepository = personRepository;
        this.studentRepository = studentRepository;
        this.responsibleRepository = responsibleRepository;
        this.mailerService = mailerService;
    }
    async createAdminIfNotExists() {
        const adminEmail = process.env.ADMIN_EMAIL || 'admin@demo.com';
        const adminPassword = process.env.ADMIN_PASSWORD || 'pass1234';
        const existingAdmin = await this.userRepository.findOne({ where: { email: adminEmail } });
        const name = 'director';
        if (!existingAdmin) {
            const hashedPassword = await bcryptjs.hash(adminPassword, 10);
            const admin = this.userRepository.create({
                name: name,
                email: adminEmail,
                password: hashedPassword,
                rol: 'director',
            });
            await this.userRepository.save(admin);
        }
        else {
            console.log('Ya existe');
        }
    }
    create(createUserDto) {
        return this.userRepository.save(createUserDto);
    }
    async createUser(name, email, rol) {
        const password = (0, crypto_1.randomBytes)(8).toString('hex');
        const user = this.userRepository.create({
            name,
            email,
            password: await bcryptjs.hash(password, 15),
            rol
        });
        await this.userRepository.save(user);
        await this.mailerService.sendMail({
            to: email,
            subject: 'Bienvenido',
            text: `Tu contraseña es: ${password}`,
        });
        return user;
    }
    async requestUserParent(createUserParentDto) {
        const personId = createUserParentDto.personId;
        const student = await this.studentRepository.findOneBy({ admission_number: createUserParentDto.admission_number });
        console.log(student, "student");
        if (!student) {
            return "Estudiante no encontrado";
        }
        if (personId) {
            const person = await this.personRepository.findOneBy({ id: personId });
            if (!person)
                return "Persona no encontrada";
            if (person.account === "creado")
                return "Usted ya tiene una cuenta registrada en la App";
            const responsible = await this.responsibleRepository.findOne({
                where: {
                    person: { id: personId },
                    student: { id: student.id }
                }
            });
            if (!responsible) {
                return "Ingrese datos correctos";
            }
            const name = `${person.full_name} ${person.last_name}`;
            Object.assign(person, { email_address: createUserParentDto.email, account: "solicitado" });
            await this.personRepository.save(person);
            return person;
        }
        if (student.account === "creado")
            return "Usted ya tiene una cuenta registrada en la App";
        const email = createUserParentDto.email;
        Object.assign(student, { email_address: email, account: "solicitado" });
        await this.studentRepository.save(student);
        return student;
    }
    async createUserParent(createUserParentDto) {
        const personId = createUserParentDto.personId;
        const student = await this.studentRepository.findOneBy({ admission_number: createUserParentDto.admission_number });
        if (!student) {
            return "Estudiante no encontrado";
        }
        if (personId) {
            const person = await this.personRepository.findOneBy({ id: personId });
            if (!person)
                return "Persona no encontrada";
            if (person.account === "creado")
                return "Usted ya tiene una cuenta registrada en la App";
            const name = `${person.full_name} ${person.last_name}`;
            const user = await this.createUser(name, createUserParentDto.email_address, "padre");
            Object.assign(person, { userId: user.id, email_address: createUserParentDto.email_address, account: "creado" });
            await this.personRepository.save(person);
            return person;
        }
        if (student.account === "creado")
            return "Usted ya tiene una cuenta registrada en la App";
        const name = `${student.full_name} ${student.last_name}`;
        const user = await this.createUser(name, createUserParentDto.email_address, "estudiante");
        Object.assign(student, { userId: user.id, email_address: createUserParentDto.email_address, account: "creado" });
        await this.studentRepository.save(student);
        return student;
    }
    findByOneEmail(email) {
        return this.userRepository.findOneBy({ email });
    }
    findAll() {
        return `This action returns all users`;
    }
    findOne(id) {
        return `This action returns a #${id} user`;
    }
    update(id, updateUserDto) {
        return `This action updates a #${id} user`;
    }
    remove(id) {
        return `This action removes a #${id} user`;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(person_entity_1.Person)),
    __param(2, (0, typeorm_1.InjectRepository)(student_entity_1.Student)),
    __param(3, (0, typeorm_1.InjectRepository)(responsible_entity_1.Responsible)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        mailer_1.MailerService])
], UsersService);
//# sourceMappingURL=users.service.js.map