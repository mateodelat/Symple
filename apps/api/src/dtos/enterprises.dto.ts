export class CreateEnterpriseDTO {
  readonly name: string
  readonly image?: string
  readonly turn: string
  readonly address: string
  readonly phone: string
}

export class UpdateEnterpriseDTO {
  readonly name?: string
  readonly image?: string
  readonly turn?: string
  readonly address?: string
  readonly phone?: string
}
