import Image from 'next/image';

// creamos a las propiedades de Service como un ReactComponent y le pasamos los parametros siempre
const Service = ({ image, title, description }) => {
  return (
    <div className='space-y-5 p-3 rounded-md flex flex-col items-center duration-300 hover:bg-gray-200'>
      <div className='relative w-20 h-20'>
        <Image src={image} alt='Image' fill className='object-cover' sizes='max' />
      </div>
      <h3 className='text-2xl text-primary font-semibold'>{title}</h3>
      <p className='text-center  max-w-sm text-gray-500'>{description}</p>
    </div>
  );
};

export default Service;