import type { ZodSchema, ZodError } from 'zod'

import { Button } from '@heroui/button'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/modal'
import { Form } from '@heroui/form'
import { Input, Textarea } from '@heroui/input'
import { Select, SelectItem } from '@heroui/select'
import { Checkbox } from '@heroui/checkbox'
import { Spinner } from '@heroui/spinner'

export type Option = { label: string; value: string }

export type FieldConfig<T> = {
  name: keyof T
  label: string
  type?: 'text' | 'email' | 'password' | 'select' | 'textarea' | 'checkbox'
  options?: Option[]
  show?: (mode: 'create' | 'edit', data?: T) => boolean
  disabled?: (mode: 'create' | 'edit', data?: T) => boolean
  validate?: (
    value: any,
    data: T,
    mode: 'create' | 'edit'
  ) => string | null | Promise<string | null>
}

type ReusableModalInputsProps<T> = {
  isOpen: boolean
  onClose: () => void
  title: string
  mode: 'create' | 'edit'
  fields: FieldConfig<T>[]
  formData: T
  errors: Record<string, string>
  setErrors: (errors: Record<string, string>) => void
  submitting?: boolean
  onChange: (patch: Partial<T>) => void
  onSubmit: () => void
  schema: ZodSchema<T>
}

export function zodErrorsToFormErrors(error: ZodError) {
  const result: Record<string, string> = {}

  for (const issue of error.issues) {
    const key = issue.path[0]

    if (typeof key === 'string') {
      if (!result[key]) result[key] = issue.message
    }
  }

  return result
}

export default function ReusableModalInputs<T>({
  isOpen,
  onClose,
  title,
  mode,
  fields,
  formData,
  errors,
  setErrors,
  submitting,
  onChange,
  onSubmit,
  schema,
}: ReusableModalInputsProps<T>) {
  async function handleSubmit() {
    const result = schema.safeParse(formData)

    if (!result.success) {
      setErrors(zodErrorsToFormErrors(result.error))

      return
    }
    setErrors({})
    onSubmit()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isDismissable={false}>
      <ModalContent className="max-h-[86vh] max-w-[90vw] overflow-y-scroll md:max-w-[55vw] lg:max-w-[35vw]">
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>
          <Form validationBehavior="aria" validationErrors={errors} onSubmit={handleSubmit}>
            {fields
              .filter(f => (f.show ? f.show(mode, formData) : true))
              .map(field => {
                const value = (formData as any)[field.name]
                const disabled = field.disabled?.(mode, formData)
                const error = errors[String(field.name)]

                if (field.type === 'textarea')
                  return (
                    <Textarea
                      key={String(field.name)}
                      errorMessage={error}
                      isDisabled={Boolean(disabled)}
                      isInvalid={!!error}
                      label={field.label}
                      labelPlacement="outside-top"
                      value={String(value ?? '')}
                      onChange={e => onChange({ [field.name]: e.target.value } as Partial<T>)}
                    />
                  )

                if (field.type === 'checkbox')
                  return (
                    <Checkbox
                      key={String(field.name)}
                      isDisabled={Boolean(disabled)}
                      isSelected={Boolean(value)}
                      onValueChange={v => onChange({ [field.name]: v } as Partial<T>)}
                    >
                      {field.label}
                    </Checkbox>
                  )

                if (field.type === 'select')
                  return (
                    <>
                      <p>{field.label}</p>
                      <Select
                        key={String(field.name)}
                        selectedKeys={value ? [String(value)] : []}
                        onSelectionChange={k => onChange({ [field.name]: [...k][0] } as Partial<T>)}
                      >
                        {(field.options ?? []).map(o => (
                          <SelectItem key={o.value}>{o.label}</SelectItem>
                        ))}
                      </Select>
                    </>
                  )

                return (
                  <Input
                    key={String(field.name)}
                    errorMessage={error}
                    isDisabled={Boolean(disabled)}
                    isInvalid={!!error}
                    label={field.label}
                    labelPlacement="outside-top"
                    type={field.type || 'text'}
                    value={String(value ?? '')}
                    onChange={e => onChange({ [field.name]: e.target.value } as Partial<T>)}
                  />
                )
              })}
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button onPress={onClose}>Cancel</Button>
          <Button isDisabled={submitting} onPress={handleSubmit}>
            {submitting ? <Spinner /> : 'Submit'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
