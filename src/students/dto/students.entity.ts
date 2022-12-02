import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// * Khởi tạo 1 bảng Students
@Entity({ name: 'hocvien' })
export class StudentsEntity {
  @PrimaryGeneratedColumn() //* khởi tạo khóa chính vs kiểu dữ liệu là string
  MAHV: string;

  @Column()
  HO: string;

  @Column()
  TEN: string;

  @Column({ type: 'date' })
  NGSINH;

  @Column()
  GIOITINH: string;

  @Column()
  NOISINH: string;

  @Column()
  MALOP: string;
}
