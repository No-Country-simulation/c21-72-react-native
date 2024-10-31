

import { Teacher } from '@/domain/entities/teacher';
import { TeacherResponse } from '../interfaces/teacher.response';

export class TeacherMapper {
    static responseTeacherToEntity( teacherResponse: TeacherResponse ):Teacher {
        return {
            id: teacherResponse.id,
            personId: teacherResponse.person.id,
            full_name: teacherResponse.person.full_name,
            last_name: teacherResponse.person.last_name,
            email_address: teacherResponse.person.email_address,
            address: teacherResponse.person.address,
            male: teacherResponse.person.male,
            title: teacherResponse.title,
        }
    }
}