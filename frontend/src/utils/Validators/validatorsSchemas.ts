import { valid } from './validators'

export const validSchemas = {
  name: {
    pattern: valid.namesPattern,
    minLength: valid.minLength(2),
    maxLength: valid.maxLength(50)
  },
  phone: {
    pattern: valid.phoneNumberPattern,
    minLength: valid.minLength(10),  // Example min length for phone number
    maxLength: valid.maxLength(15)   // Example max length for phone number
  },

}
