import React, { useState, useEffect, useCallback } from 'react';
import { fetchPhotos } from '../api/photos';
import { Link } from 'react-router-dom';

const ScrollPagination = () => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const loadMorePhotos = useCallback(() => {
    if (loading) return;

    setLoading(true);
    fetchPhotos(page)
      .then((newPhotos) => {
        if (newPhotos.length > 0) {
          setPhotos((prev) => [...prev, ...newPhotos]);
          setPage((prev) => prev + 1);
        } else {
          console.log("No more photos to load");
        }
      })
      .catch((err) => {
        console.error('Error fetching photos:', err);
        setError('Failed to load photos');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [loading, page]);

  useEffect(() => {
    loadMorePhotos();
  }, [loadMorePhotos, page]);

  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;
    if (bottom && !loading) {
      loadMorePhotos();
    }
  };

  return (
    <div className="container mx-auto p-[100px] h-full overflow-y-scroll bg-pink-600 " onScroll={handleScroll}>
      <div className='bg-white p-10 rounded-xl shadow-[0_0_50px_-10px_rgba(0,0,0,0.9)]'>
        <h1 className="text-4xl font-bold mb-4 text-center ">Scroll Pagination</h1>
        <p className='text-center w-[900px] mx-auto mb-3 font-[350] text-xl'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas illo libero cupiditate enim, error labore corporis perspiciatis quaerat ducimus atque ratione fugit eius exercitationem? Voluptate veritatis velit quia unde iste?</p>

        <div className='text-center mb-10 '>
          <Link to="/button-pagination"  className='text-[20px] font-medium text-blue-700 cursor-pointer active:text-purple-700 ' >ortga qaytish</Link>
        </div>


        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 border border-red-300 rounded-md">
            {error}
          </div>
        )}

        <div className="grid grid-cols-3 gap-4">
          {photos.map((photo) => (
            <div key={photo.id} className="border rounded-md p-2 overflow-hidden shadow-[0_0_50px_-10px_rgba(0,0,0,0.5)]">
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-64 object-cover"
                onError={(e) => e.target.src = 'https://via.placeholder.com/150'}
              />
              <div className="p-4">
                <p className="text-sm text-gray-600">{photo.title}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <Link to="/button-pagination" className="text-blue-500">Go to Button Pagination</Link>
        </div>
      </div>

    </div>
  );
};

export default ScrollPagination;
