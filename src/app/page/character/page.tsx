import CharacterDetailSwiper from '@/components/CharacterDetailSwiper'
import React from 'react'

export default function Page() {
  return (
    <div>
      <div className='my-5 mt-20'>
        <CharacterDetailSwiper slides={[
          { src: '/img/character/detail/ธิดา.jpg', alt: 'Hero Image 1' },
          { src: '/img/character/detail/กานต์.jpg', alt: 'Hero Image 2' },
          { src: '/img/character/detail/แพลนเนต.jpg', alt: 'Hero Image 3' },
          { src: '/img/character/detail/แม็ค.jpg', alt: 'Hero Image 4' },
          { src: '/img/character/detail/กวาง.jpg', alt: 'Hero Image 4' },
          { src: '/img/character/detail/สิงโต.jpg', alt: 'Hero Image 5' },
          { src: '/img/character/detail/ขิม.jpg', alt: 'Hero Image 5' },
          { src: '/img/character/detail/เจ.jpg', alt: 'Hero Image 5' },
        ]} />
      </div>
    </div>
  )
}
