import { PASSWORD_MUST_BE_AT_LEAST_8_CHARACTERS, PASSWORD_MUST_CONTAIN_ALPHANUMERIC_CHARACTERS, REQUIRE_FIELD } from '@/constants/constants'
import * as z from 'zod'

export const AuthWithEmailAndPasswordSchema = z.object({
  email: z.string().min(1, REQUIRE_FIELD),
  password: z.string().min(1, REQUIRE_FIELD)
  // password: z.string()
  //   .min(8, PASSWORD_MUST_BE_AT_LEAST_8_CHARACTERS)
  //   .regex(
  //     /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,100}$/i,
  //     PASSWORD_MUST_CONTAIN_ALPHANUMERIC_CHARACTERS
  //   ),
})