interface CONSTANTS {
  DEFAULT_DURATION_VALUE: number
  DEFAULT_WHEEL_CHANGE_INTERVAL_MS: number
  TOASTER_NOTIFICATION_DURATION_MS: number
  PICK_MODE_DEFAULT_VALUE: string
  DEFAULT_LIST: List[]

}
// 1 -  10 //
// * 10          1
export const randomHexColor = (): string => {
  return (Math.floor(Math.random() * 15728639) + 1048576).toString(16)
}

const API: CONSTANTS = {
  DEFAULT_DURATION_VALUE: 5, // Default duration for picking the winner
  DEFAULT_WHEEL_CHANGE_INTERVAL_MS: 50, // Default changing to other elements interval in ms
  TOASTER_NOTIFICATION_DURATION_MS: 1000, // duration of the each toaster notification
  PICK_MODE_DEFAULT_VALUE: 'Go Through', // {  Go Through || Jump Between Elements || Elimination }
  DEFAULT_LIST: [
    { text: 'Mango', id: 'ADASDDQ123', selected: false, background: randomHexColor() },
    { text: 'Banana', id: 'ZXCDQ123', selected: false, background: randomHexColor() },
    { text: 'Pineapple', id: 'A5435DDQ123', selected: false, background: randomHexColor() },
    { text: 'Orange', id: '12SDDQ123', selected: false, background: randomHexColor() },
    { text: 'Watermelon', id: 'ADZXÇQ123', selected: false, background: randomHexColor() },
    { text: 'Corn', id: 'A12ÇDDQ123', selected: false, background: randomHexColor() },
    { text: 'Lemon', id: 'AZÇÇQ123', selected: false, background: randomHexColor() },
    { text: 'Peach', id: 'AD123123', selected: false, background: randomHexColor() },
    { text: 'Tomato', id: 'ANM--Q123', selected: false, background: randomHexColor() }
  ]

}

export default API
