'use client'

import React from 'react'
import { Combobox } from '@headlessui/react'

export default function SearchBox() {
  return (
    <Combobox as="div">
      <Combobox.Input />
      <Combobox.Options>
        <Combobox.Option key="a" value="a">
          AAA
        </Combobox.Option>
        <Combobox.Option key="b" value="b">
          BBB
        </Combobox.Option>
      </Combobox.Options>
    </Combobox>
  )
}
