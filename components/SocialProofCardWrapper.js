'use client'

import dynamic from 'next/dynamic'

const SocialProofCard = dynamic(
  () => import('./SocialProofCard'),
  { ssr: false }
)

export default function SocialProofCardWrapper() {
  return <SocialProofCard
    layout="horizontal"
    avatars={[
      { useText: false, image: { src: 'https://framerusercontent.com/images/GfGkADagM4KEibNcIiRUWlfrR0.jpg', alt: 'User 1' } },
      { useText: false, image: { src: 'https://framerusercontent.com/images/aNsAT3jCvt4zglbWCUoFe33Q.jpg', alt: 'User 2' } },
      { useText: false, image: { src: 'https://framerusercontent.com/images/BYnxEV1zjYb9bhWh1IwBZ1ZoS60.jpg', alt: 'User 3' } },
      { useText: true, text: '2000+', textColor: '#FFFFFF', textFont: { fontSize: '14px', variant: 'Semibold', letterSpacing: '-0.01em', lineHeight: '1em' }, textBackgroundColor: '#D4A853' },
    ]}
    avatarSize={48}
    overlapDistance={14}
    avatarBorderColor="#0A0C12"
    avatarShadow={true}
    avatarRotation={15}
    gap={14}
    message="Trusted by 2000+ users"
    messageColor="#B0B5C7"
    messageFont={{ fontSize: '15px', variant: 'Medium', letterSpacing: '-0.01em', lineHeight: '1.3em' }}
    cardBackground="rgba(255, 255, 255, 0.04)"
    cardBorderRadius={16}
    cardBorder={true}
    cardBorderWidth={1}
    cardBorderColor="rgba(255, 255, 255, 0.08)"
    cardShadow={false}
    cardBackdropBlur={12}
    cardPadding="8px 20px 8px 20px"
  />
}
