export const secretKey = () => {
  const secret = process.env.SECRET_KEY
  return secret
}

export const convertToJSValueSQL = (key: string) => {
  const secret = process.env.SECRET_KEY
  return `pgp_sym_decrypt(${key}::bytea,'${secret}', 'cipher-algo=aes256')`
}
