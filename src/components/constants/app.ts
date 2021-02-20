export enum GENDER {
  LAKI_LAKI = "laki-laki",
  PEREMPUAN = "perempuan",
}

export enum APPS {
  userapp = 1,
  backoffice = 2
}

export enum UserRole {
  SISWA = 'siswa',
  BENDAHARA = 'bendahara',
  GURU = 'guru',
  WALI_KELAS = 'wali kelas',
}

export enum RELIGION {
  ISLAM = 'islam',
  KRISTEN = 'kristen',
  KATOLIK = 'katolik',
  HINDU = 'hindu',
  BUDDHA = 'buddha'
}

export enum PTK_TYPE {
  GURU_MAPEL = 'Guru Mapel',
  KEPALA_SEKOLAH = 'Kepala Sekolah',
  GURU_BK = 'Guru BK'
}

export interface IUnfilledAtt {
  createdAt?: Date
  updatedAt?: Date
  isDeleted?: boolean
}
export type TUnfilledAtt = 'createdAt' | 'UpdatedAt' | 'isDeleted'

export const AUTH_PAYLOAD_ALGORITHM = 'aes-192-cbc';
export const AUTH_PAYLOAD_PASSWORD = 'wtkwX1ywsnB'
export const AUTH_PAYLOAD_SALT = 'WV32JMr1kU'
export const AUTH_PAYLOAD_SALT_ROUND = 24
export const APP_NAME = 'MS'
export const AUTH_AUDIENCE = 'YADIKA'