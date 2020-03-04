import React from 'react'

type SetString = (
  changeFn: (v: string) => void,
) => (ev: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
export const setString: SetString = changeFn => ev => changeFn(ev.target.value)
