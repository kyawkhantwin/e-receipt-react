import { FieldConfig } from '@/components/ResuableModelInputs'

export type AdminEditUserData = {
  username: string
  email: string
  firstName: string
  lastName: string
  enabled: boolean
  role: string
}

export type UserData = {
  id?: string
  username: string
  email: string
  firstName: string
  lastName: string
  password?: string
  enabled: boolean
  appId: string
  merchantId: string
  createdBy: string
  serial?: string | null
  role: string
  merchantAddress: string
  merchantName: string
}

export const editUserFields: FieldConfig<UserData>[] = [
  {
    name: 'username',
    label: 'Username',
    disabled: mode => mode === 'edit',
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    disabled: mode => mode === 'edit',
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
    name: 'enabled',
    label: 'Enabled',
    type: 'checkbox',
  },
  {
    name: 'appId',
    label: 'App ID',
    disabled: mode => mode === 'edit',
  },
  {
    name: 'merchantId',
    label: 'Merchant ID',
    disabled: mode => mode === 'edit',
  },
  {
    name: 'createdBy',
    label: 'Created By',
    show: mode => mode === 'create',
  },
  {
    name: 'serial',
    label: 'Serial',
    disabled: mode => mode === 'edit',
  },
  {
    name: 'role',
    label: 'Role',
    disabled: () => true,
  },
]
