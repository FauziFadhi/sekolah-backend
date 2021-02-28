import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { BaseFilter } from 'components/base/base.filter';
import { Op, seq } from 'database/config';
import { FindOptions } from 'sequelize/types';

export const TeacherCourseListFilter = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): FindOptions => {

    const request = ctx.switchToHttp().getRequest();

    return new filter(request)
  },
);

/** models @see {Course} */
class filter extends BaseFilter {

  params: any
  constructor(req) {

    super(req.query)
    this.params = req.params

    this.whereIsDeleted().orderById()

    if (req.params.teacherId)
      this.whereTeacherId()

    if (this.query.search)
      this.search()

  }

  whereIsDeleted() {
    this.where = {
      ...this.where,
      isDeleted: false,
    }
    return this
  }

  orderById() {
    this.order = [...this.order as [], ['id', 'asc']]
    return this
  }

  search() {
    this.where = {
      ...this.where,
      [Op.or]: [
        seq.where(seq.fn('lower', seq.col('Course.name')), { [Op.like]: `%${this.query.search}%` }),
      ]
    }
    return this

  }

  whereTeacherId() {
    this.include.push(
      {
        through: {
          attributes: [],
        },
        association: 'teachers',
        attributes: ['id'],
        where: {
          id: this.params.teacherId,
        }
      }
    )
  }
}
