"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateResponsibleDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_responsible_dto_1 = require("./create-responsible.dto");
class UpdateResponsibleDto extends (0, mapped_types_1.PartialType)(create_responsible_dto_1.CreateResponsibleDto) {
}
exports.UpdateResponsibleDto = UpdateResponsibleDto;
//# sourceMappingURL=update-responsible.dto.js.map