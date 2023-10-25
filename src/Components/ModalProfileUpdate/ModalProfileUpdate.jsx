/* eslint-disable react/prop-types */

import CenterDiv from './../CenterDiv/CenterDiv';
import Button from './../Buttons/Button';
import {RxCross2 }  from 'react-icons/rx';
import { Cropper } from 'react-cropper';
const ModalProfileUpdate = (props) => {
  return (
    <div className="absolute top-0 left-0 w-full h-full z-20">
      <div onClick={props.onClick} className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-30'></div>
      <CenterDiv className="bg-white md:w-[600px] w-[350px] rounded-lg p-5 z-40">
        <span onClick={props.onClick} className="bg-thirty absolute rounded-full p-2 text-white top-3 right-3 active:scale-95 cursor-pointer"><RxCross2></RxCross2></span>
        <h1 className="text-2xl text-center">Update or Change Your Profile Picture</h1>
        <input onChange={props.onChange} type="file" title='Chose your picture' name="file" id="file" className='file:py-3 file:px-5 file:mr-5 file:rounded-lg file:border-0 file:cursor-pointer cursor-pointer file:text-white file:bg-primary my-5 border w-full rounded-lg border-primary' />
        {props.image && <div
            className="img-preview overflow-hidden rounded-full mx-auto mb-4"
            style={{ width: "100%", height: "100px" }}
          >
        </div>}
        {props.image && <Cropper
          ref={props.cropperRef}
          style={{ height: 350, width: "100%", marginTop: "1rem" }}
          zoomTo={0.5}
          initialAspectRatio={1}
          preview=".img-preview"
          src={props.image}
          viewMode={1}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
          guides={true}
        />}
        <Button onClick={props.getCropData} className="bg-thirty text-white border border-thirty text-xl font-blod mr-4 mt-4">Upload</Button>
        <Button onClick={props.onClick} className="bg-white border-red-500 border text-red-500 text-xl font-blod">Cencle</Button>
      </CenterDiv>
    </div>
  )
}

export default ModalProfileUpdate