import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentEntity } from './entity/student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentEntity)
    private studentRepository: Repository<StudentEntity>,
  ) {}

  getAllStudents = (): Promise<StudentEntity[]> => {
    return this.studentRepository.find();
  };

  //   getAllStudents(): Promise<StudentEntity[]> {
  //     return this.studentsRepository.find();
  //   }
}
