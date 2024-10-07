'use client';
import React from "react";
import HTMLFlipBook from "react-pageflip";
import { Magnifier } from 'solguruz-react-image-magnifier';

const Page = React.forwardRef((props, ref) => {
  return (
    <div
      ref={ref}
      className={`demoPage ${props.number === 1 ? 'bg-gray-50 w-full h-full' : ''}`}
    >
      {props.image && (
        <Magnifier
          image={props.image}
          zoom={2}
          width="100%"
          magnifierWidth={150}
          magnifierHeight={150}
          borderWidth={2}
          borderColor="white"
        />
      )}
    </div>
  );
});

const Cover = React.forwardRef((props, ref) => {
  return (
    <div className="cover" ref={ref}>
      <img
        src={props.image}
        alt={props.title}
        className="w-full h-full object-cover"
      />
    </div>
  );
});

function MyBook(props) {
  return (
    <div className="flex flex-col items-center">
      <h3 className="text-3xl font-bold text-center mt-6 mb-8">
        sdasdasdas
      </h3>
      <HTMLFlipBook
        width={500}
        height={700}
        size="fixed"
        minWidth={315}
        maxWidth={1000}
        minHeight={400}
        maxHeight={1533}
        maxShadowOpacity={0.5}
        showCover={true}
        mobileScrollSupport={true}
        className="demo-book"
      >
        <Cover title="Front Cover" image="/assets/book/front.png" />
        <Page number={1} image="/book/1.png" />
        <Page number={2} image="/book/2.png" />
        <Page number={3} image="/book/3.png" />
        <Page number={4} image="/book/4.png" />
        <Page number={5} image="/book/5.png" />
        <Page number={6} image="/book/6.png" />
        <Page number={7} image="/book/7.png" />
        <Page number={8} image="/book/8.png" />
        <Page number={9} image="/book/9.png" />
        <Page number={10} image="/book/10.png" />
        <Page number={11} image="/book/11.png" />
        <Page number={12} image="/book/12.png" />
        <Page number={13} image="/book/13.png" />
        <Page number={14} image="/book/14.png" />
        <Page number={15} image="/book/15.png" />
        <Page number={16} image="/book/16.png" />
        <Page number={17} image="/book/17.png" />
        <Page number={18} image="/book/18.png" />
        <Page number={19} image="/book/19.png" />
        <Page number={20} image="/book/white.png" />
        <Cover title="Back Cover" image="/assets/book/back.png" />
      </HTMLFlipBook>
    </div>
  );
}


export default MyBook;
