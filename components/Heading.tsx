import { orbitron } from '@/app/font'

interface HeadingProps {
  children: React.ReactNode
}

export default function Heading({ children }: HeadingProps) {
  return <h1 className={`font-bold text-2xl ${orbitron.className}`}>{children}</h1>
}
