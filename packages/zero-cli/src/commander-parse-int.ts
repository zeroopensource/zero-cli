import { InvalidArgumentError } from 'commander'

export const commanderParseInt = (value: string) => {
  const parsedValue = parseInt(value, 10)
  if (isNaN(parsedValue)) {
    throw new InvalidArgumentError('not a number')
  }
  return parsedValue
}
