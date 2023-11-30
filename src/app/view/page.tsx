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

import { FaRegCopy, FaHouse, FaAngleRight, FaHeart, FaRegHeart, FaBars, FaFacebook, FaXTwitter, FaRegShareFromSquare } from "react-icons/fa6";

import type { PDFDocumentProxy } from 'pdfjs-dist';
import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from "@nextui-org/modal";

import {
  LineShareButton,
  FacebookShareButton,
  TwitterShareButton,
} from "react-share";
import { SiLine } from 'react-icons/si';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

const resizeObserverOptions = {};
const maxWidth = 850;

interface BookProps {
  id: string,
  booktype: string,
  title: string,
  date: string,
  path: string,
}

interface Comic {
  id: string,
  title: string,
  date: string,
  path: string,
}

export default function PDFViewPage() {
  const [numPages, setNumPages] = useState<number>();
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
          <h1 className='text-sm xs:text-base font-semibold text-black dark:text-white sm truncate'>ตอน &quot;{comic?.title}&quot; {comic?.booktype}</h1>
        </NavbarBrand>
        <NavbarContent justify='end'>
          <NavbarItem className='hidden md:block'>
            <Button onPress={onOpen} color='primary' variant='solid' radius='full' isIconOnly aria-label="Share Page">
              <FaRegShareFromSquare className='ml-0.5' size={18} />
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop='blur' placement='bottom-center' size='xs' className='mb-4'>
        <ModalContent>
          {(onClose) => (
            <section>
              <ModalHeader className="flex flex-col gap-1">แชร์ตอน &quot;{comic?.title}&quot;</ModalHeader>
              <ModalBody>
                <section className='flex justify-center gap-2 mb-4'>
                  <Button isIconOnly radius='full' size='md' className='bg-emerald-500 text-white dark:bg-emerald-600 border-2 border-emerald-400 dark:border-emerald-500'>
                    <LineShareButton
                      url={`https://sofiapular.trinpsri.net/view?id=${comic?.id}`}
                      title={`ตอน "${comic?.title}" อ่านยัง! ติดตามได้ที่ SofiaPular Renewed :`}
                    >
                      <SiLine size={22} />
                    </LineShareButton>
                  </Button>
                  <Button isIconOnly radius='full' size='md' className='bg-blue-500 text-white dark:bg-blue-600 border-2 border-blue-400 dark:border-blue-500'>
                    <FacebookShareButton
                      url={`https://sofiapular.trinpsri.net/view?id=${comic?.id}`}
                      hashtag='#SofiaPularRenewed'
                    >
                      <FaFacebook size={22} />
                    </FacebookShareButton>
                  </Button>
                  <Button isIconOnly radius='full' size='md' className='bg-zinc-800 text-white border-2 border-zinc-700'>
                    <TwitterShareButton
                      url={`https://sofiapular.trinpsri.net/view?id=${comic?.id}`}
                      title={`ตอน "${comic?.title}" อ่านยัง! ติดตามได้ที่ SofiaPular Renewed :`}
                    >
                      <FaXTwitter size={22} />
                    </TwitterShareButton>
                  </Button>
                </section>
              </ModalBody>
            </section>
          )}
        </ModalContent>
      </Modal>
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
          <div className='block md:hidden'>
            <Button onPress={onOpen} color='primary' variant='solid' radius='full' isIconOnly aria-label="Share Page">
              <FaRegShareFromSquare className='ml-0.5 items-center' size={18} />
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
                aria-label={`Page ${index + 1}`}
              />
            ))}
          </Document>
        </div>
      </div>
    </div>
  );
};