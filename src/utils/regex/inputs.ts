export const regexDate = /^\d{4}-\d{2}-\d{2}$/;
export const regexDateTime =
  /^(?:(?!0000)\d{4})-(?:(0[1-9]|1[0-2]))-(?:(0[1-9]|[12]\d|3[01]))\s(?:[01]\d|2[0-3]):[0-5]\d$/;
export const regexPhoneNumber = /^\+\d{3} \d{2} \d{3} \d{2} \d{2}$/;
export const regexPassportId = /^[A-Z]{2} \d{7}$/;
export const regexBirthSeria = /^[a-zA-Z] [a-zA-Z]{2} \d{7}$/;
export const regexOnlyString = /^[a-zA-Zа-яА-ЯёЁҒғҚқҲҳЎў\s]+$/;
export const regexOnlyNumber = /^\d+$/;
// export const regexOnlyPlusNumberNotZero = /^[1-9]\d*$/;
