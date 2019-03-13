import { getGlobal, setGlobal } from 'reactn'
import { connect } from '@holochain/hc-web-client'
import { setPort } from '../util/constants'

export const ZOME_NAME = 'event'

const PORT = setPort()

export async function hcConnect() {
  const connection = await connect(`ws://localhost:${PORT}`)
  const instanceInfo = await connection.call('info/instances')({})

  if (connection && instanceInfo) {
    setGlobal({
      hc: {
        call: connection.call,
        close: connection.close,
        connected: true,
        instance: instanceInfo[0]
      }
    })
    return true
  }
  return false
}

export async function hcCall(callString, params) {
  const globalState = getGlobal()

  if (globalState && globalState.hc && globalState.hc.connected) {
    return globalState.hc.call(callString)(params)
  }
  return null
}

export async function hcInstanceCall(callString, params) {
  const globalState = getGlobal()
  if (globalState && globalState.hc && globalState.hc.connected) {
    return hcCall(globalState.hc.instance.id + '/' + callString, params)
  }
  return null
}

export async function getEntry(address) {
  return hcInstanceCall(`${ZOME_NAME}/get_entry`, { entry_address: address })
}

export async function getEntryHistory(address) {
  return hcInstanceCall(`${ZOME_NAME}/get_entry_history`, {
    entry_address: address
  })
}
