import { Person } from "./person"

export interface Student{
    id?: number,
    full_name: string,
    last_name: string,
    admission_number: string,
    academic_year: number,
    date_of_admission: Date,
    email_address: string,
    male: string,
    address: string,
    grado: string,
    salon: string,
    userId?: number,
    type?: string
}

export interface Family {
    full_name: string,
    last_name: string,
    admission_number: string,
    academic_year: number,
    date_of_admission: Date,
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