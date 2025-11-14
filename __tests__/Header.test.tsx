import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Header from '@/app/components/Header'

describe('Header Component', () => {
  it('renders the header with name', () => {
    render(<Header />)
    expect(screen.getByText('Russell Saint Cyr')).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    render(<Header />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Projects')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
  })
})
