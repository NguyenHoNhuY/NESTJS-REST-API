import { Column, Entity, PrimaryColumn } from 'typeorm';

// * Khởi tạo 1 bảng Students
@Entity({ name: 'hocvien' })
export class StudentEntity {
  @PrimaryColumn({ type: 'char', length: 5 }) //* khởi tạo khóa chính vs kiểu dữ liệu là string
  MAHV: string;

  @Column({ type: 'varchar', length: 40 })
  HO: string;

  @Column({ type: 'varchar', length: 10 })
  TEN: string;

  @Column({ type: 'date' })
  NGSINH;

  @Column({ type: 'varchar', length: 3 })
  GIOITINH: string;

  @Column({ type: 'varchar', length: 40 })
  NOISINH: string;

  @Column({ type: 'char', length: 3 })
  MALOP: string;
}
