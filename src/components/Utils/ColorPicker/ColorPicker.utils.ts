export const rgbToHexa = ({ r, g, b }: TRGBColor) => {
  const _ = (dec) => `00${Math.round(dec).toString(16)}`.substr(-2)
  return `#${_(r)}${_(g)}${_(b)}`
}

export const hexToRGB = (hex: string) => {
  const clean = hex.replace('#', '').toLowerCase()

  if (clean.length !== 6 || clean.match(/[^0-9a-f]/)) {
    console.warn(
      `incorrect hexadecimal value "${hex}", only accepts 6 characters hex values`
    )
    return
  }

  const [r, g, b] = clean.match(/.{2}/g).map((hex) => parseInt(hex, 16))
  return { r, g, b }
}

type TRGBColor = {
  r: number
  g: number
  b: number
}

/*
 * /!\ use 256 colors.
 */
export const findColorTint = ({ r, g, b }: TRGBColor): TRGBColor => {
  const max = Math.max(...[r, g, b])

  const factor = 255 / max

  const up = (value) => Math.round(value * 100000 * factor) / 100000

  const upped = {
    r: up(r),
    g: up(g),
    b: up(b)
  }

  const factor2 = Math.min(
    ...[upped.r, upped.g, upped.b]
      .filter((v) => v !== 1)
      .map((v) => 255 / (255 - v))
  )

  const result = Object.keys(upped)
    .map((key) => ({
      key,
      value: 255 - (255 - upped[key]) * factor2
    }))
    .reduce(
      (acc, cur) => ({
        ...acc,
        [cur.key]: Math.abs(Math.round(cur.value))
      }),
      {}
    ) as TRGBColor

  if (Object.values(result).includes(NaN))
    return {
      r: 255,
      g: 0,
      b: 0
    }

  return result
}

export const findColorTintPosition = (color): number => {
  const startPoints = {
    r: 4,
    g: 0,
    b: 2
  }

  const roundResult = (value) => Math.round(value * 200) / 200

  const list = Object.keys(color).reduce(
    (acc, key) => [
      ...acc,
      {
        key,
        value: color[key]
      }
    ],
    []
  )

  const higher = list.find(({ value }) => value >= 255)
  const second = list.find(({ value, key }) => key !== higher.key && value > 0)

  const startPoint = startPoints[higher.key]

  if (!second) {
    return (startPoint + 2) % 6
  }

  let secondStartPoint = startPoints[second.key]
  if (secondStartPoint < startPoint) secondStartPoint += 6

  if (second.value >= 255) {
    return (
      (secondStartPoint + (secondStartPoint - startPoint === 2 ? 1 : 3)) % 6
    )
  }

  const ratio = second.value / 255

  if (secondStartPoint - startPoint === 2) {
    return roundResult((secondStartPoint + ratio) % 6)
  }

  return roundResult((secondStartPoint + 3 + ratio) % 6)
}

export const findColorGradientPosition = (color): { x: number; y: number } => {
  const max = Math.max(...Object.values<number>(color)) / 255
  const min = Math.min(...Object.values<number>(color)) / 255
  return {
    x: 1 - min / max,
    y: 1 - max
  }
}

export function updateArrayItem<T>(update: { id: string } & T) {
  return function (array: ({ id: string } & T)[]) {
    return array.map((item) =>
      item.id === update.id ? { ...item, ...update } : item
    )
  }
}

export const getColorLuminosity = (hex: string) => {
  const clean = hex.replace('#', '').toLowerCase()

  if (clean.length !== 6 || clean.match(/[^0-9a-f]/)) {
    throw `incorrect hexadecimal value "${hex}", only accepts 6 characters hex values`
  }

  const split = clean.match(/.{2}/g).map((hex) => parseInt(hex, 16) / 256)

  return split.reduce((acc, cur) => acc + cur, 0) / 3
}
