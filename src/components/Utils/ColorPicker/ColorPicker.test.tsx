import { findColorTint, findColorTintPosition } from './ColorPicker.utils'

describe('color picker', () => {
	describe('utils functions', () => {
		describe('findColorTint', () => {
			it('detect pure color', () => {
				expect.assertions(3)
				expect(
					findColorTint({
						r: 255,
						g: 0,
						b: 0
					})
				).toEqual({
					r: 255,
					g: 0,
					b: 0
				})

				expect(
					findColorTint({
						r: 255,
						g: 255,
						b: 0
					})
				).toEqual({
					r: 255,
					g: 255,
					b: 0
				})

				expect(
					findColorTint({
						r: 255,
						g: 0,
						b: 255
					})
				).toEqual({
					r: 255,
					g: 0,
					b: 255
				})
			})
			it('detects pure red from right', () => {
				expect.assertions(1)
				expect(
					findColorTint({
						r: 200,
						g: 0,
						b: 0
					})
				).toEqual({
					r: 255,
					g: 0,
					b: 0
				})
			})

			it('detects pure green from right', () => {
				expect.assertions(1)
				expect(
					findColorTint({
						r: 0,
						g: 100,
						b: 0
					})
				).toEqual({
					r: 0,
					g: 255,
					b: 0
				})
			})

			it('detects pure blue from right', () => {
				expect.assertions(1)
				expect(
					findColorTint({
						r: 0,
						g: 0,
						b: 20
					})
				).toEqual({
					r: 0,
					g: 0,
					b: 255
				})
			})
			it('detects pure yellow from right', () => {
				expect.assertions(1)
				expect(
					findColorTint({
						r: 0.5,
						g: 0.5,
						b: 0
					})
				).toEqual({
					r: 255,
					g: 255,
					b: 0
				})
			})

			it('detect from more complex colors 1', () => {
				expect.assertions(1)
				expect(
					findColorTint({
						r: 113,
						g: 150,
						b: 76
					})
				).toEqual({
					r: 128,
					g: 255,
					b: 0
				})
			})

			it('detect from more complex colors 2', () => {
				expect.assertions(1)
				expect(
					findColorTint({
						r: 133,
						g: 198,
						b: 204
					})
				).toEqual({
					r: 0,
					g: 233,
					b: 255
				})
			})
		})

		describe('findColorTintPosition', () => {
			describe('works with pure colors', () => {
				it('red', () => {
					expect.assertions(1)
					expect(
						findColorTintPosition({
							r: 255,
							g: 0,
							b: 0
						})
					).toEqual(0)
				})

				it('green', () => {
					expect.assertions(1)

					expect(
						findColorTintPosition({
							r: 0,
							g: 255,
							b: 0
						})
					).toEqual(2)
				})

				it('blue', () => {
					expect.assertions(1)

					expect(
						findColorTintPosition({
							r: 0,
							g: 0,
							b: 255
						})
					).toEqual(4)
				})
			})

			describe('works with simple colors combination', () => {
				it('yellow', () => {
					expect.assertions(1)
					expect(
						findColorTintPosition({
							r: 255,
							g: 255,
							b: 0
						})
					).toEqual(1)
				})

				it('cyan', () => {
					expect.assertions(1)

					expect(
						findColorTintPosition({
							r: 0,
							g: 255,
							b: 255
						})
					).toEqual(3)
				})

				it('purple', () => {
					expect.assertions(1)

					expect(
						findColorTintPosition({
							r: 255,
							g: 0,
							b: 255
						})
					).toEqual(5)
				})
			})

			describe('works with colors combination', () => {
				expect.assertions(3)

				it('1', () => {
					expect.assertions(1)

					expect(
						findColorTintPosition({
							r: 128,
							g: 255,
							b: 0
						})
					).toEqual(1.5)
				})
				it('2', () => {
					expect.assertions(1)
					expect(
						findColorTintPosition({
							r: 0,
							g: 255,
							b: 128
						})
					).toEqual(2.5)
				})
				it('3', () => {
					expect.assertions(1)
					expect(
						findColorTintPosition({
							r: 0,
							g: 128,
							b: 255
						})
					).toEqual(3.5)
				})

				it('4', () => {
					expect.assertions(1)
					expect(
						findColorTintPosition({
							r: 0,
							g: 64,
							b: 255
						})
					).toEqual(3.25)
				})
			})
		})
	})
})
