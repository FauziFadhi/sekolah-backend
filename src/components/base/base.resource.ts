
const JSONAPISerializer = require('json-api-serializer');

type Resource = 'student'

export class BaseResource {
  protected serializer = new JSONAPISerializer()

  constructor(resource: Resource, data: any) {

    this.serializer.register('student', {
      id: 'id',
    })
    this.serializer.register('teacher', {
      id: 'id',
    })
    this.serializer.register('course', {
      id: 'id',
    })
    this.serializer.register('major', {
      id: 'id',
    })

    return this.serializer.serialize(resource, data)
  }
}
