const { JWT } = require('google-auth-library')
const keys = require('./jwt.keys.json')

async function main() {
  const client = new JWT(
    keys.client_email,
    null,
    keys.private_key,
    ['https://www.googleapis.com/auth/cloud-platform'],
  )
  const url = `https://dns.googleapis.com/dns/v1/projects/${keys.project_id}`
  const res = await client.request({ url })
  console.log(res.data)
}

main().catch(console.error)
