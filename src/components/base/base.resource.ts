
const JSONAPISerializer = require('json-api-serializer');

type Resource = 'student'

export class BaseResource {
  protected serializer = new JSONAPISerializer()

  constructor(resource: Resource, data: any) {

    this.serializer.register('student', {
      id: 'id',
      whitelist: ['id', 'name'],


      relationships: {

      },
    })

    return this.serializer.serialize(resource, data)
  }
}
