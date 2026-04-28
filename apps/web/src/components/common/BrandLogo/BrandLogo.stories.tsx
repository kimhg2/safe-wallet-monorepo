import type { Meta, StoryObj } from '@storybook/react'
import BrandLogo from '.'

const meta = {
  title: 'Components/BrandLogo',
  component: BrandLogo,
  tags: ['autodocs'],
} satisfies Meta<typeof BrandLogo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Compact: Story = {
  args: {
    compact: true,
  },
}
