export declare class FamilyMemberDto {
    personId: number;
    full_name: string;
    last_name: string;
    email_address?: string;
    male: string;
    address: string;
    type: string;
}
export declare class CreateStudentDto {
    full_name: string;
    last_name: string;
    admission_number: string;
    academic_year: number;
    date_of_admission: Date;
    email_address?: string;
    address: string;
    grado: string;
    salon: string;
    family: FamilyMemberDto[];
}
