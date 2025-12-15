import { editUserSchema } from '../schema/editUserSchema'

import { AdminEditUserData } from './UserData'

import { FieldConfig } from '@/components/ResuableModelInputs'

export const editAdminUserFields: FieldConfig<AdminEditUserData>[] = [
  {
    name: 'username',
    label: 'Username',
    disabled: mode => mode === 'edit',
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
  },
  {
    name: 'firstName',
    label: 'First Name',
  },
  {
    name: 'lastName',
    label: 'Last Name',
  },

  {
    name: 'role',
    label: 'Role',
    disabled: () => true,
  },
]

export { editUserSchema }
