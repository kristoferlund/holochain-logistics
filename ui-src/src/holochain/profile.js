import { hcInstanceCall } from '.'

export async function getUserProfile () {
  try {
    const result = await hcInstanceCall('event/get_my_member_profile', {})

    if (result) {
      const profile = JSON.parse(result).Ok
      return profile
    }
  } catch (err) {
    console.log(err)
  }
  return {}
}
