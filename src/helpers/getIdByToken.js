import jwtDecode from 'jwt-decode'

export function getIdByToken (token) {
  return jwtDecode(token).sub
}
