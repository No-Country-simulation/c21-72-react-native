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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Responsible = void 0;
const person_entity_1 = require("../../person/entities/person.entity");
const student_entity_1 = require("../../student/entities/student.entity");
const typeorm_1 = require("typeorm");
let Responsible = class Responsible {
};
exports.Responsible = Responsible;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Responsible.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => student_entity_1.Student, (student) => student.responsibles),
    (0, typeorm_1.JoinColumn)({ name: 'studentId' }),
    __metadata("design:type", student_entity_1.Student)
], Responsible.prototype, "student", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => person_entity_1.Person, (person) => person.responsibles),
    (0, typeorm_1.JoinColumn)({ name: 'personId' }),
    __metadata("design:type", person_entity_1.Person)
], Responsible.prototype, "person", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Responsible.prototype, "type", void 0);
exports.Responsible = Responsible = __decorate([
    (0, typeorm_1.Entity)()
], Responsible);
//# sourceMappingURL=responsible.entity.js.map