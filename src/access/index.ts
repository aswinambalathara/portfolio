import type { Access } from 'payload'

export const authenticated: Access = ({ req: { user } }) => Boolean(user)

export const anyone: Access = () => true

// Anonymous Payload API access is denied everywhere except Media read (PRD §7.5).
export const adminOnly = {
  read: authenticated,
  create: authenticated,
  update: authenticated,
  delete: authenticated,
}

export const adminOnlyGlobal = {
  read: authenticated,
  update: authenticated,
}
