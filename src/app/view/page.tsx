'use client';

import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/navbar';
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@nextui-org/button';
import { Link } from '@nextui-org/link';
import { Slider } from '@nextui-org/slider';
import { useCallback, useState, useEffect, useRef } from 'react';
import { useResizeObserver } from '@wojtekmaj/react-hooks';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

import { FaRegCopy, FaHouse, FaAngleRight, FaHeart, FaRegHeart, FaArrowLeft, FaArrowRight } from "react-icons/fa6";

import type { PDFDocumentProxy } from 'pdfjs-dist';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

const resizeObserverOptions = {};
const maxWidth = 950;

interface BookProps {
  id: string,
  title: string,
  date: string,
  path: string,
}

export default function PDFViewPage() {
  const [numPages, setNumPages] = useState<number>();
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>();
  const onResize = useCallback<ResizeObserverCallback>((entries) => {
    const [entry] = entries;
    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);
  useResizeObserver(containerRef, resizeObserverOptions, onResize);
  function onDocumentLoadSuccess({ numPages: nextNumPages }: PDFDocumentProxy): void {
    setNumPages(nextNumPages);
  }
  const [isFilled, setIsFilled] = useState(false);
  const handleClick = () => {
    setIsFilled(!isFilled);
  };
  const [scale, setScale] = useState(1.0);
  const handleSliderChange = (value: any) => {
    setScale(value / 100);
  };
  const [isVisible, setIsVisible] = useState(true);
  const sectionRef = useRef<HTMLElement | null>(null);
  const handleClickOutside = (event: any) => {
    if (sectionRef.current && !sectionRef.current.contains(event.target)) {
      setIsVisible(prevIsVisible => !prevIsVisible);
    }
  };

  const [comic, setComic] = useState<BookProps | undefined>(undefined)
  const searchParams = useSearchParams()
  const comicId = searchParams.get('id')

  useEffect(() => {
    const getComic = async () => {
      const response = await fetch(`/api/comics/${comicId}`)
      const data = await response.json()
      setComic(data)
      console.log("Comic", data)
    }
    if (comicId) getComic()
  }, [comicId])
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='bg-white text-white dark:bg-black hide-scrollbar'>
      <Navbar position='sticky' maxWidth='2xl' isBordered shouldHideOnScroll>
      <NavbarBrand>
        <Button as={Link} href='/page' color='default' variant='light' size='sm' radius='full' isIconOnly aria-label="Home">
          <FaHouse className='mb-0.5 text-black dark:text-white' size={18} />
        </Button>
        <FaAngleRight className='mr-1.5 text-black dark:text-white' size={12} />
        <h1 className='text-sm xs:text-base font-semibold text-black dark:text-white sm truncate'>ตอน &quot;{comic?.title}&quot;</h1>
      </NavbarBrand>
      <NavbarContent justify='end'>
        <NavbarItem>
          <Button as={Link} color='primary' href='#' variant='solid' radius='full' isIconOnly aria-label="Share Page">
            <FaRegCopy className='ml-0.5' size={18} />
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
      <section ref={sectionRef} className={`fixed flex justify-center items-center w-full z-10 bottom-5 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className='flex gap-2 bg-white/85 dark:bg-black/85 backdrop-blur-sm items-center rounded-full border-2 border-gray-200 dark:border-zinc-700 transition-all duration-300 ease-in-out p-1'>
          <div className='flex gap-1'>
            <Button as={Link} href='#' color='default' variant='light' radius='full' isIconOnly onClick={handleClick} aria-label='Bookmark'>
              {isFilled ? <FaHeart className='text-[#FF639B]' size={22} /> : <FaRegHeart className='text-[#B3B3B3] dark:text-white' size={22} />}
            </Button>
          </div>
          <Slider
            step={5}
            maxValue={100}
            minValue={20}
            defaultValue={100}
            onChange={handleSliderChange}
            className='w-24 xs:w-36 sm:40'
            showTooltip={true}
            renderThumb={(props) => (
              <div
                {...props}
                className="group p-1 bg-white top-1/2 shadow-medium rounded-full cursor-grab data-[dragging=true]:cursor-grabbing"
              >
                <span className="transition-transform rounded-full w-4 h-4 block group-data-[dragging=true]:scale-90" />
              </div>
            )}
          />
          <div className='flex gap-1'>
            <Button as={Link} href='#' color='default' variant='solid' radius='full' isIconOnly aria-label='Next Page'>
              <FaArrowLeft className='text-white' size={20} />
            </Button>
            <Button as={Link} href='#' color='default' variant='solid' radius='full' isIconOnly aria-label='Previous Page'>
              <FaArrowRight className='text-white' size={20} />
            </Button>
          </div>
        </div>
      </section>
      <div className='flex flex-col items-center my-2'>
        <div className='w-full max-w-full' ref={setContainerRef}>
          <Document file={comic?.path} onLoadSuccess={onDocumentLoadSuccess} className='flex flex-col items-center'>
            {Array.from(new Array(numPages), (el, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                scale={scale}
                width={containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth}
                className='my-1.5 shadow-md'
              />
            ))}
          </Document>
        </div>
      </div>
    </div>
  );
};