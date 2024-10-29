import { Person } from "./person"

export interface Student{
    full_name: string,
    last_name: string,
    admision_number: string,
    academic_year: number,
    date_of_admision: Date,
    email_address: string,
    male: string,
    address: string,
    grado: string,
    salon: string,
}

export interface Family {
    full_name: string,
    last_name: string,
    admision_number: string,
    academic_year: number,
    date_of_admision: Date,
    email_address: string,
    male: string,
    address: string,
    grado: string,
    salon: string,
    family: Person[]
}

export interface Responsible{
    personId: string,
    studentId: number,
    type: string,
}

/** Type
 ** Padre
 ** Madre
 ** Abuelo
 ** Abuela
 */