import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SocialLinks from '@/app/components/SocialLinks'

describe('SocialLinks Component', () => {
  it('renders GitHub link with correct href', () => {
    render(<SocialLinks />)
    const githubLink = screen.getByLabelText('GitHub')
    expect(githubLink).toHaveAttribute('href', 'https://github.com/russellsaintcyr')
    expect(githubLink).toHaveAttribute('target', '_blank')
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders LinkedIn link with correct href', () => {
    render(<SocialLinks />)
    const linkedinLink = screen.getByLabelText('LinkedIn')
    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/russellsaintcyr/')
    expect(linkedinLink).toHaveAttribute('target', '_blank')
    expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders with custom className', () => {
    const { container } = render(<SocialLinks className="custom-class" />)
    const div = container.firstChild
    expect(div).toHaveClass('custom-class')
  })

  it('renders with default className', () => {
    const { container } = render(<SocialLinks />)
    const div = container.firstChild
    expect(div).toHaveClass('flex')
    expect(div).toHaveClass('items-center')
    expect(div).toHaveClass('space-x-6')
  })

  it('renders both links', () => {
    render(<SocialLinks />)
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(2)
  })
})
