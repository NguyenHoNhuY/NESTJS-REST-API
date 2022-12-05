import { Controller, Get } from '@nestjs/common';
import { StudentService } from './student.service';

@Controller('students')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Get('list')
  async getAllStudents() {
    const response = await this.studentService.getAllStudents();
    return response;
  }
}
