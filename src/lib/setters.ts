import React from 'react'

type SetString = (changeFn: (v: string) => void) => (ev: React.ChangeEvent<HTMLInputElement>) => void
export const setString: SetString = changeFn => ev => changeFn(ev.target.value)
