import dynamic from 'next/dynamic'

const AskAI = dynamic(() => import('./AskAI'), { ssr: false })

export default function AskAIWrapper() {
  return <AskAI />
}
