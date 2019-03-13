import { ZOME_NAME, hcInstanceCall } from '.'

export async function hcGetUserProfile() {
  try {
    const result = await hcInstanceCall(
      `${ZOME_NAME}/get_my_member_profile`,
      {}
    )

    if (result) {
      const profile = JSON.parse(result).Ok
      return profile
    }
  } catch (err) {
    console.log(err)
  }
  return {}
}

export async function hcRegisterUser({ name, avatarURL, description }) {
  try {
    const result = await hcInstanceCall(`${ZOME_NAME}/register`, {
      name,
      avatar_url: avatarURL,
      description
    })

    if (result) {
      const profile = JSON.parse(result).Ok
      return profile
    }
  } catch (err) {
    console.log(err)
  }
  return {}
}
