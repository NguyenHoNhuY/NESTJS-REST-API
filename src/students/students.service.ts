import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentsEntity } from './dto/students.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(StudentsEntity)
    private studentsRepository: Repository<StudentsEntity>,
  ) {}

  getAllStudents = (): Promise<StudentsEntity[]> => {
    return this.studentsRepository.find();
  };

  //   getAllStudents(): Promise<StudentsEntity[]> {
  //     return this.studentsRepository.find();
  //   }
}
