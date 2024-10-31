import { TeacherService } from './teacher.service';
export declare class TeacherController {
    private readonly teacherService;
    constructor(teacherService: TeacherService);
    findAll(offset: string, limit: string): Promise<import("./entities/teacher.entity").Teacher[]>;
    findOne(id: number): Promise<string | {
        id: number;
        personId: number;
        address: string;
        deleteAt: Date;
        email_address: string;
        full_name: string;
        last_name: string;
        male: string;
    }>;
}
