import { OnModuleInit } from '@nestjs/common';
import { UsersService } from './users/users.service';
export declare class AppModule implements OnModuleInit {
    private readonly userService;
    constructor(userService: UsersService);
    onModuleInit(): Promise<void>;
}
