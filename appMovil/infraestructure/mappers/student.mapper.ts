import { Student } from "@/domain/entities/student";
import { StudentResponse } from "../interfaces/student.response";



export class StudentMapper {
    static responseStudentToEntity( studentResponse: StudentResponse ):Student {
        return {
            id: studentResponse.id,
            full_name: studentResponse.full_name,
            last_name: studentResponse.last_name,
            admission_number: studentResponse.admission_number,
            academic_year: studentResponse.academic_year,
            date_of_admission: studentResponse.date_of_admission,
            email_address: studentResponse.email_address,
            male: studentResponse.male,
            address: studentResponse.address,
            grado: studentResponse.grado,
            salon: studentResponse.salon,
            userId: studentResponse.userId,
        }
    }
}