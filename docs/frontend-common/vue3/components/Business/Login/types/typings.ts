import { VERIFICATION_CODE_TEXT_COLOR } from './const'

export type LoginType = 'password' | 'verificationCode' | 'register'

export type VerificationCodeTextColor = typeof VERIFICATION_CODE_TEXT_COLOR[keyof typeof VERIFICATION_CODE_TEXT_COLOR]

export type PasswordType = 'set' | 'edit' | 'reset'
