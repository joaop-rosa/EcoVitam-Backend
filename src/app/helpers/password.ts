import CryptoJS from "crypto-js"

export function getPassword(password: string) {
  const decodedPassword = CryptoJS.enc.Base64.parse(password).toString(
    CryptoJS.enc.Utf8
  )

  const encryptedPassword = CryptoJS.MD5(
    process.env.MD5_API_SALT + decodedPassword
  ).toString()

  return encryptedPassword
}
