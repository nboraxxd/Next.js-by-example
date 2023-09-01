interface HeadingProps {
  children: React.ReactNode
}

export default function Heading({ children }: HeadingProps) {
  return <h1 className="font-orbitron font-bold text-center text-5xl">{children}</h1>
}
