import { Person } from "@/domain/entities/person";
import { PersonResponse } from "../interfaces/teacher.response";

export class PersonMapper {
    static responsePersonToEntity( personResponse: PersonResponse ):Person {
        return {
            id: personResponse.id,
            full_name: personResponse.full_name,
            last_name: personResponse.last_name,
            email_address: personResponse.email_address,
            address: personResponse.address,
            male: personResponse.male,
            account: personResponse.account,
            userId: personResponse.userId
        }
    }
}