import os from 'node:os'

function getIPAdress() {
  let localIPAddress = ''
  const interfaces = os.networkInterfaces()
  for (const devName in interfaces) {
    const iface = interfaces[devName] as os.NetworkInterfaceInfo[]
    for (let i = 0; i < iface.length; i++) {
      const alias = iface[i]
      if (
        alias.family === 'IPv4'
        && alias.address !== '127.0.0.1'
        && !alias.internal
      )
        localIPAddress = alias.address
    }
  }
  return localIPAddress
}
export default getIPAdress
