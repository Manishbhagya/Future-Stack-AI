import dynamic from 'next/dynamic'

const ProgressStepsSection = dynamic(() => import('./ProgressStepsSection'), { ssr: false })

export default function ProgressStepsSectionWrapper(props) {
  return <ProgressStepsSection {...props} />
}
