import { FieldConfig } from '@/components/ResuableModelInputs'
import { CreateAdminUserDto, CreateUserDto } from '@/api/useUserApi'

export const createUserFields: FieldConfig<CreateUserDto>[] = [
  {
    name: 'username',
    label: 'Username',
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
    name: 'password',
    label: 'Password',
    type: 'password',
  },
  {
    name: 'role',
    label: 'Role',
    disabled: () => true,
  },
]
export const createAdminUserFields: FieldConfig<CreateAdminUserDto>[] = [
  {
    name: 'username',
    label: 'Username',
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
    name: 'password',
    label: 'Password',
    type: 'password',
  },
  {
    name: 'role',
    label: 'Role',
    disabled: () => true,
  },
]

export const createCashierUserFields = (
  terminalSerials: string[]
): FieldConfig<CreateUserDto>[] => [
  {
    name: 'username',
    label: 'Username',
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
    name: 'serial',
    label: 'Terminal Serial',
    type: 'select',
    options: terminalSerials.map(serial => ({ label: serial, value: serial })),
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
  },
  {
    name: 'role',
    label: 'Role',
    disabled: () => true,
  },
]
