'use client'
import React from 'react'
import { useSearchStore } from '@/store/searchStore'

const InputField = () => {
  const setText = useSearchStore((state) => state.setText)

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const input = form.elements.namedItem('search') as HTMLInputElement
    setText(input.value)
  }

  return (
    <form onSubmit={handleSearch} style={{ display: 'flex', gap: 8 }}>
      <input
        type="text"
        name="search"
        placeholder="キーワード検索"
      />
      <button type="submit">検索</button>
    </form>
  )
}

export default InputField