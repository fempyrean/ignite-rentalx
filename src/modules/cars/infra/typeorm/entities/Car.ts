import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  JoinColumn,
  ManyToMany,
  JoinTable
} from 'typeorm'
import { v4 as uuid } from 'uuid'
import { Category } from './Category'
import { Specification } from './Specification'

@Entity('cars')
class Car {
  @PrimaryColumn()
  readonly id: string

  @Column()
  name: string

  @Column()
  description: string

  @Column()
  daily_rate: number

  @Column()
  available: boolean

  @Column({ unique: true })
  license_plate: string

  @Column()
  fine_amount: number

  @Column()
  brand: string

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category

  @ManyToMany(() => Specification)
  @JoinTable({
    name: 'specifications_car',
    joinColumns: [{ name: 'car_id' }],
    inverseJoinColumns: [{ name: 'specification_id' }]
  })
  specifications: Specification[]

  @CreateDateColumn()
  created_at: Date

  constructor() {
    if (!this.id) {
      this.id = uuid()
      this.available = true
    }
  }
}

export { Car }
