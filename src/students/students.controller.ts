import { Controller, Get } from '@nestjs/common';
import { StudentsService } from './students.service';

@Controller('students')
export class StudentsController {
  constructor(private studentsService: StudentsService) {}

  @Get('list')
  async getAllStudents() {
    const response = await this.studentsService.getAllStudents();
    return response;
  }
}
