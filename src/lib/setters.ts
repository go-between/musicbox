import React from 'react'

type SetString = (
  changeFn: (v: string) => void,
) => (ev: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
export const setString: SetString = changeFn => ev => changeFn(ev.target.value)

type SetStringNull = (
  changeFn: (v: string | null) => void,
) => (ev: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
export const setStringNull: SetStringNull = changeFn => ev => changeFn(ev.target.value === '' ? null : ev.target.value)


type SetNumber = (
  changeFn: (v: number) => void,
) => (ev: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
export const setNumber: SetNumber = changeFn => ev => changeFn(parseInt(ev.target.value))


type SetNumberNull = (
  changeFn: (v: number | null) => void,
) => (ev: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
export const setNumberNull: SetNumberNull = changeFn => ev => changeFn(ev.target.value === '' ? null : parseInt(ev.target.value))
