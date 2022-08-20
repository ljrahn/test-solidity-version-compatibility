export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000"

export const sleep = async (time: number) => {
  return new Promise((res) => {
    setTimeout(() => {
      res(undefined)
    }, time)
  })
}
