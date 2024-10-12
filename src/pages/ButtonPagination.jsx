import React, { useState, useEffect } from 'react';
import { fetchPhotos } from '../api/photos';
import { Link } from 'react-router-dom';

const ButtonPagination = () => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPhotos = () => {
      fetchPhotos(page)
        .then((data) => {
          if (data.length > 0) {
            setPhotos(data);
            setError(null); 
          } else {
            console.log("No photos found");
          }
        })
        .catch((error) => {
          console.error('Error fetching photos:', error);
          setError('Failed to load photos'); 
        });
    };
    getPhotos();
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="container mx-auto p-[100px] bg-pink-600 ">
      <div className='bg-white p-6 rounded-xl shadow-[0_0px_50px_-10px_rgba(0,0,0,0.9)]' >
        <h1 className="text-4xl font-bold mb-4 text-center ">Button Pagination</h1>
        <p className='text-center font-[350] w-[900px] mb-10 mx-auto text-xl'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat aliquid modi soluta. Quisquam ipsum ut accusantium suscipit facere necessitatibus deleniti nulla fugiat! A quam rem sint praesentium facere nobis officia!</p>


        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 border border-red-300 rounded-md">
            {error}
          </div>
        )}

        <div className="grid grid-cols-3 gap-4">
          {photos.length > 0 ? (
            photos.map((photo) => (
              <div key={photo.id} className="border rounded overflow-hidden shadow-[0_0_50px_-10px_rgba(0,0,0,0.5)]">
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-64 object-cover p-2"
                  onError={(e) => e.target.src = 'https://via.placeholder.com/150'}
                />
                <div className="p-4">
                  <p className="text-sm text-gray-600">{photo.title}</p>
                </div>
              </div>
            ))
          ) : (
            <p>Loading photos...</p>
          )}
        </div>

        <div className="mt-4 flex justify-center space-x-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
            <button
              key={n}
              onClick={() => handlePageChange(n)}
              className={`px-4 py-2 rounded-md ${n === page ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}
            >
              {n}
            </button>
          ))}
        </div>

        <div className="mt-4 text-center mx-auto">
          <Link to="/scroll-pagination" className="text-blue-500 active:text-purple-700">Scrollga o'tish</Link>
        </div>
      </div>

    </div>
    );
};

export default ButtonPagination;
