import dynamic from 'next/dynamic'

const WhatsAppChatWidget = dynamic(() => import('./WhatsAppChatWidget'), { ssr: false })

export default function WhatsAppChatWidgetWrapper(props) {
  return <WhatsAppChatWidget {...props} />
}
